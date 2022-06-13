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
const user = require('../src/routes/User')
const product = require('./routes/Product')

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/product', product)

mongoose
    .connect('mongodb://database:27017/crud-node-mongo-docker', {
        useNewUrlParser: true
    })
    .then(result => {
        console.log('MongoDB has been successfully connected!')
    })
    .catch(error => {
        console.log(error)
    })

app.listen(PORT, () => console.log(`Server node app listening on port ${PORT}!`))