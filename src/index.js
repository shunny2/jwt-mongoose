require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./docs/swaggerConfig')

const app = express()
const PORT = process.env.PORT || 9000

app.use(cors())
app.use(bodyParser.json())

const auth = require('../src/routes/Auth')
const user = require('../src/routes/User')

// Swagger Configs
if (process.env.NODE_ENV !== 'test') {
    const swaggerSpec = (swaggerJsDoc(swaggerConfig))
    app.get('/api/v1/swagger.json',  (req, res)=> {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', user)

// Database
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