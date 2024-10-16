const { DataTypes } = require('sequelize');
const sequelize = require('.');

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Message;