const express = require('express');
const router = express.Router();

// const authRoute = require('./authRoutes');
// const chatRoute = require('./chatRoutes');

// router.use('/auth', authRoute);
// router.use('/chat', chatRoute);

router.get('/', (req, res) => {
    res.send('Welcome to the ChatApp API');
});

module.exports = router;