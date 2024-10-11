const { hashPassword, comparePassword, generateToken } = require('../services/authService');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);
    res.json({ message: 'Login successful', token });
}

module.exports = { registerUser, loginUser };