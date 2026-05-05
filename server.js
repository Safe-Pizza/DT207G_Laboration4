//Hämta paket
const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//Routes
app.use(`/api`, authRoute);

//starta servern
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})