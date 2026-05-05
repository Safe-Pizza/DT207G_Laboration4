const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    res.json({ message: `Register page` });
})

router.post('/login', async (req, res) => {
    res.json({ message: `Login page` });
})

module.exports = router;