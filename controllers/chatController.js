const chatService = require('../services/chatService');

exports.sendMessage = async (req, res) => {
    const { content, roomId } = req.body;
    const message = await chatService.sendMessage(req.user.id, content, roomId);
    res.status(201).json({ message });
};

exports.getMessages = async (req, res) => {
    const { roomId } = req.params;
    const messages = await chatService.getMessages(roomId);
    res.json(messages);
};