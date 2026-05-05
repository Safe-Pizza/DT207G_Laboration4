const express = require('express');
const router = express.Router();

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
            //Skapa användare i databasen
            res.status(201).json({ message: `User ${username} created successfully` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error occurred_ ${error}` });
    }
});

//Logga in
router.post('/login', async (req, res) => {
    res.json({ message: `Login page` });
})

module.exports = router;