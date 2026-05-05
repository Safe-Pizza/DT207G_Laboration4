//Hämta paket
const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
require('dotenv').config();

//Varibel för express
const app = express();

//Formulärdata
app.use(bodyParser.json());

//Variabel för port
const port = process.env.PORT || 3000;

//Routes
app.use(`/api`, authRoute);

//starta servern
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})