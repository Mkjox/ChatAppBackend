const chatService = require('../services/chatService');

const createMessage = async (req, res) => {
    const { roomId, userId, content } = req.body;

    try {
        const newMessage = await chatService.createMessage({ roomId, userId, content });
        return res.status(201).json(newMessage);
    }
    catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const messages = await chatService.getAllMessages();
        return res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const getMessagesByRoomId = async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await chatService.getMessagesByRoomId(roomId);
        return res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    try {
        const deletedMessage = await chatService.deleteMessage(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found.' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting the message:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessagesByRoomId,
    deleteMessage
}















// exports.sendMessage = async (req, res) => {
//     const { content, roomId } = req.body;
//     const message = await chatService.sendMessage(req.user.id, content, roomId);
//     res.status(201).json({ message });
// };

// exports.getMessages = async (req, res) => {
//     const { roomId } = req.params;
//     const messages = await chatService.getMessages(roomId);
//     res.json(messages);
// };