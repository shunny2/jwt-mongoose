require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 9000

app.use(cors())
app.use(bodyParser.json())

const auth = require('../src/routes/Auth')
const cars = require('../src/routes/Cars')

app.use('/api', auth)

mongoose
    .connect('mongodb://database:27017/crud-node-mongo-docker', {
        useNewUrlParser: true
    })
    .then(result => {
        console.log('MongoDB has been successfully connected!');
    })
    .catch(error => {
        console.log(error);
    });

app.listen(PORT, () => console.log(`Server node app listening on port ${PORT}!`))