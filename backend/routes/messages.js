const express = require('express');
const router = express.Router();
const { User, Pet, Message } = require('../models');
const { Op } = require('sequelize');

// @route   GET /api/messages/:userId
// @desc    Get all conversations for a user
router.get('/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        
        // Find all messages involving the user
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ]
            },
            include: [
                { model: User, as: 'sender', attributes: ['id', 'name', 'image'] },
                { model: User, as: 'receiver', attributes: ['id', 'name', 'image'] },
                { model: Pet, as: 'pet', attributes: ['id', 'name'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        // Group by conversation (the other user) to get the latest message
        const conversationsMap = new Map();
        
        messages.forEach(msg => {
            const isSender = msg.sender_id === userId;
            const otherUser = isSender ? msg.receiver : msg.sender;
            
            if (!otherUser) return; // Safeguard against deleted users

            const otherUserId = otherUser.id;
            
            // Map tracks the latest message because messages are ordered DESC
            if (!conversationsMap.has(otherUserId)) {
                conversationsMap.set(otherUserId, {
                    id: otherUserId,
                    user: otherUser.name || 'Bilinmeyen Kullanıcı',
                    avatar: otherUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name || 'User')}&background=f97316&color=fff`,
                    lastMessage: msg.content || '',
                    time: msg.createdAt,
                    unread: (!isSender && !msg.is_read) ? 1 : 0,
                    petName: msg.pet ? msg.pet.name : 'Genel Sohbet'
                });
            } else {
                // If conversation exists, just accumulate unread count
                if (!isSender && !msg.is_read) {
                    const conv = conversationsMap.get(otherUserId);
                    conv.unread += 1;
                    conversationsMap.set(otherUserId, conv);
                }
            }
        });

        const conversations = Array.from(conversationsMap.values());
        res.json(conversations);
    } catch (err) {
        console.error('[GET /api/messages/:userId] Error:', err);
        res.status(500).json({ error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' });
    }
});

// @route   GET /api/messages/:userId/:otherId
// @desc    Get message history between two users
router.get('/:userId/:otherId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const otherId = parseInt(req.params.otherId, 10);

        if (isNaN(userId) || isNaN(otherId)) {
            return res.status(400).json({ error: 'Invalid IDs' });
        }

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId, receiver_id: otherId },
                    { sender_id: otherId, receiver_id: userId }
                ]
            },
            include: [
                { model: User, as: 'sender', attributes: ['id', 'name', 'image'] },
                { model: User, as: 'receiver', attributes: ['id', 'name', 'image'] }
            ],
            order: [['createdAt', 'ASC']]
        });
        
        // Mark fetched messages as read
        const unreadMessageIds = messages
            .filter(m => m.receiver_id === userId && !m.is_read)
            .map(m => m.id);
            
        if (unreadMessageIds.length > 0) {
            await Message.update(
                { is_read: true },
                { where: { id: unreadMessageIds } }
            );
        }

        res.json(messages);
    } catch (err) {
        console.error('[GET /api/messages/:userId/:otherId] Error:', err);
        res.status(500).json({ error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' });
    }
});

// @route   POST /api/messages
// @desc    Send a message
router.post('/', async (req, res) => {
    try {
        const { sender_id, receiver_id, content, pet_id } = req.body;
        
        if (!sender_id || !receiver_id || !content) {
            return res.status(400).json({ error: 'Eksik bilgi gönderildi.' });
        }

        const message = await Message.create({
            sender_id,
            receiver_id,
            content,
            pet_id: pet_id || null,
            is_read: false
        });
        
        const fullMessage = await Message.findByPk(message.id, {
            include: [
                { model: User, as: 'sender', attributes: ['id', 'name', 'image'] },
                { model: User, as: 'receiver', attributes: ['id', 'name', 'image'] }
            ]
        });

        res.status(201).json(fullMessage);
    } catch (err) {
        console.error('[POST /api/messages] Error:', err);
        res.status(500).json({ error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' });
    }
});

module.exports = router;
