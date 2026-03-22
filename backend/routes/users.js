const express = require('express');
const router = express.Router();
const { User, Pet } = require('../models');

// @route   GET /api/users/:id
// @desc    Get user profile by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        // Get listing count
        const listingCount = await Pet.count({
            where: { owner_id: req.params.id }
        });
        
        const userData = user.toJSON();
        userData.listings_count = listingCount;
        
        res.json(userData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
