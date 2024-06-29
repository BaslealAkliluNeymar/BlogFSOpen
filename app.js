const express = require('express')
const logger = require('./utils/logger')
const constants = require('./utils/config')
const mongoose = require('mongoose')
require('express-async-errors')
const blog = require('./controllers/blog')
const user = require('./controllers/user')
const login = require('./controllers/login')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')

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
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/login',login)
app.use('/api/users',user)
app.use('/api/blogs',middleware.userExtractor,blog)


app.use(middleware.unknownEndpoint)

module.exports = app