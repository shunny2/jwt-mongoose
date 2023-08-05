const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./docs/swaggerConfig')

require('dotenv').config()

const app = express()

app.use(express.json())

app.use(cors())
app.use(bodyParser.json())

const auth = require('../src/routes/Auth')
const user = require('../src/routes/User')

// Swagger Configs
if (process.env.NODE_ENV !== 'test') {
    const swaggerSpec = (swaggerJsDoc(swaggerConfig))
    app.get('/api/v1/swagger.json',  (_, res)=> {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    });
    
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

// Routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', user)

module.exports = app