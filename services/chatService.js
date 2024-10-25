const { Message } = require('../models');

const createMessage = async ({ roomId, userId, content }) => {
    const newMessage = await Message.create({ roomId, userId, content });
    return newMessage;
};

const getAllMessages = async () => {
    const messages = await Message.findAll();
    return messages;
};

const getMessagesByRoomId = async (roomId) => {
    try {
        const messages = await Message.findAll({
            where: {roomId},
        });
        return messages;
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};

const deleteMessage = async (messageId) => {
    const deleted = await Message.destroy({ where: { id: messageId } });
    return deleted;
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessagesByRoomId,
    deleteMessage,
};