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

//Jämför lösenord
schemaUser.methods.comparePassword = async function (password) {
    try {
        await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

//Logga in användare
schemaUser.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });

        //kontroll finns användarnamn i databasen
        if(!user) {
            throw new Error(`Incorrect username or password.`);
        }

        //kontroll löseord matchar
        const isMatch = await user.comparePassword(password);

        //lösenord inte matchar
        if (!isMatch) {
            throw new Error(`Incorrect username or password.`);
        }

        //vid lösenordsmatchning, returnera användare
        return user;

    } catch (error) {
        throw error;
    }
}

const User = mongoose.model(`User`, schemaUser);
module.exports = User;