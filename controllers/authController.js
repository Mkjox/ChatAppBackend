const { hashPassword, comparePassword, generateToken } = require('../services/authService');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    await body('username').isString().notEmpty().run(req);
    await body('email').isEmail().notEmpty().run(req);
    await body('password').isLength({ min: 6 }).notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user });
};

const loginUser = async (req, res) => {
    await body('username').isString().notEmpty().run(req);
    await body('password').isLength({ min: 6 }).notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user.id);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser, loginUser };