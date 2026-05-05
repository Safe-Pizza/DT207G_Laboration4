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

//Hasha lösenord innan det sparas i databasen
schemaUser.pre('save', async function () {
    try {
        if (this.isNew || this.isModified('password')) {
            const hashPassword = await bcrypt.hash(this.password, 10);
            this.password = hashPassword;
        }
    } catch (error) {
       throw error;
    }
});

//Registera användare
schemaUser.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model(`User`, schemaUser);
module.exports = User;