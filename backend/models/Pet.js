const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Kedi', 'Köpek', 'Kuş', 'Tavşan', 'Balık', 'Diğer'),
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('Erkek', 'Dişi'),
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    listing_type: {
        type: DataTypes.ENUM('Sahiplendirme', 'Emanet'),
        allowNull: false
    },
    start_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    end_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'pets'
});

module.exports = Pet;
