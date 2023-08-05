const mongoose = require('mongoose')
const app = require('./app')

require('dotenv').config()

const PORT = process.env.PORT || 9000

// Database
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })
    .then(result => {
        const { _readyState } = result.connection

        if ( _readyState === 1 )
            console.log('MongoDB has been successfully connected!')
    })
    .catch(error => {
        console.log(error)
    })

app.listen(PORT, () => console.log(`Server node app listening on port ${PORT}!`))