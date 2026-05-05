//Hämta paket
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();

//Variabel för databas URI
const mongoUri = process.env.DATABASE;

//Anslutning databas
mongoose.connect(mongoUri).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log("Connection failure" + error);
})

const User = require('../models/User');

//Skapa användarkonto
router.post('/register', async (req, res) => {
    try {
        //Hämta data från request body
        const { username, password } = req.body;

        //Validera data
        const errors = [];
        if (!username) {
            errors.push('Invalid input: Username is required');
        }
        if (!password) {
            errors.push('Invalid input: Password is required');
        }
        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        } else {
            //Skapa och spara användare i databasen
            const user = new User({ username, password });
            await user.save();

            res.status(201).json({ message: `User ${username} created successfully` });
        }
    } catch (error) {
        //Felhantering för felkod: 11000 (duplicate key error)
        if (error.code === 11000) {
            return res.status(409).json({ message: `Username already exists please select another.` });
        }
        res.status(500).json({ message: `Error occurred: ${error}` });
    }
});

//Logga in
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera data
        if (!username || !password) {
            return res.status(400).json({ message: `Invalid input: Username and password are required` });
        }

        //Kontrollera om användaren finns i databasen
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: `Invalid username or password` });
        }

        //Kontrollera lösenord
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: `Invalid username or password` });
        } else {
            res.status(200).json({ message: `User ${username} logged in successfully` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error occurred: ${error}` });
    }
});

module.exports = router;