//Hämta paket
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Skapa schema för user
const schemaUser = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    user_created: {
        type: Date,
        default: Date.now
    }
});