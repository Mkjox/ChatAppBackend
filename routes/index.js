const express = require('express');
const authRoute = require('./authRoutes');
const chatRoute = require('./chatRoutes');
const router = express.Router();


router.use('/auth', authRoute);
router.use('/chat', chatRoute);

router.get('/', (req, res) => {
    res.send('Welcome to the ChatApp API');
});

module.exports = router;