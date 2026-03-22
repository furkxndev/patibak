const User = require('./User');
const Pet = require('./Pet');
const Message = require('./Message');
const Favorite = require('./Favorite');
const sequelize = require('../config/db');

// Associations
User.hasMany(Pet, { foreignKey: 'owner_id', as: 'pets' });
Pet.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// Favorites (Many-to-Many)
User.belongsToMany(Pet, { through: Favorite, foreignKey: 'user_id', as: 'favoritePets' });
Pet.belongsToMany(User, { through: Favorite, foreignKey: 'pet_id', as: 'favoritedBy' });

// Messages
User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });
Message.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });

module.exports = {
    sequelize,
    User,
    Pet,
    Message,
    Favorite
};
