const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model
const router = express.Router();

const saltRounds = 10;

/**
 * @method post
 * @description Save new user with hashed password within Database
 */
router.post('/api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword  // Save hashed password
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        if (err === 11000) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(400).json({ message: 'Error saving data', error: err });
        }
    }
});

/**
 * @method get
 * @description GET endpoint to return a single user by email
 */
router.get('/api/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });  // Find user by email
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);  // Return the user as JSON
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
});

/**
 * @method get
 * @description GET endpoint to return all users
 */
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();  // Find all users
        res.status(200).json(users);  // Return users as JSON
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

module.exports = router;
