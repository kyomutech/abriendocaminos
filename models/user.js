const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true }
}, { collection: 'Users' });

/**
 * @description Export the User model
 */
module.exports = mongoose.model('User', userSchema);