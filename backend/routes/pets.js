const express = require('express');
const router = express.Router();
const { Pet, User } = require('../models');

// @route   GET /api/pets
// @desc    Get all pets
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(pets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/pets/:id
// @desc    Get pet by ID
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'image', 'rating']
            }]
        });
        
        if (!pet) {
            return res.status(404).json({ msg: 'Pet not found' });
        }
        
        res.json(pet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/pets
// @desc    Create a pet listing
router.post('/', async (req, res) => {
    try {
        const { 
            name, type, breed, age, gender, city, 
            listing_type, description, image, color, owner_id 
        } = req.body;

        const pet = await Pet.create({
            name,
            type,
            breed,
            age,
            gender,
            city,
            listing_type,
            description,
            image: image || 'https://images.unsplash.com/photo-1543466835-00a732f21d52?w=500&h=600&fit=crop',
            color: color || '#F8FAFC',
            owner_id: owner_id || 1 // Default to user 1 for now
        });

        res.status(201).json(pet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
