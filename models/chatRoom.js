const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const ChatRoom = sequelize.define('ChatRoom', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = ChatRoom;