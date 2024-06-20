const express = require('express')
const logger = require('./utils/logger')
const constants = require('./utils/config')
const mongoose = require('mongoose')
const blog = require('./controllers/blog')
const cors = require('cors')
const app = express()

const MONGODB_URI = constants.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
        .then(() =>{
            logger.info('Connecting to the database')
        })
        .catch((err) =>{
            logger.error('Connection Failed',err)
        })


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use('/api/blogs',blog)


module.exports = app