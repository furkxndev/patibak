const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favorite = sequelize.define('Favorite', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    pet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    timestamps: true,
    tableName: 'favorites'
});

module.exports = Favorite;
