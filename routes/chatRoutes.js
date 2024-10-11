const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.post('/sendMessage', chatController.sendMessage);
router.get('/getMessages/:roomId', chatController.getMessages);

module.exports = router;