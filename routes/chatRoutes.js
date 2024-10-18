const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.post('/sendMessage', chatController.createMessage);
router.get('/getMessages/:roomId', chatController.getMessagesByRoomId);
router.get('/getAllMessages', chatController.getAllMessages);

module.exports = router;