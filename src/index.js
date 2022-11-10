require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const swagguerUi = require('swagger-ui-express') 

const app = express()
const PORT = process.env.PORT || 9000

app.use(cors())
app.use(bodyParser.json())

const docs = require('./docs/swagger')
const auth = require('../src/routes/Auth')
const user = require('../src/routes/User')

app.use('/api/v1/docs', swagguerUi.serve, swagguerUi.setup(docs))
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', user)

mongoose
    .connect('mongodb://database:27017/jwt-node-mongo-docker', {
        useNewUrlParser: true
    })
    .then(result => {
        const { _readyState } = result.connection;

        if ( _readyState === 1 )
            console.log('MongoDB has been successfully connected!')
    })
    .catch(error => {
        console.log(error)
    })

app.listen(PORT, () => console.log(`Server node app listening on port ${PORT}!`))