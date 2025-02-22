const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request,response, next) => {
  const authorization = request.get('authorization')
  if(authorization && (authorization.startsWith('bearer') || authorization.startsWith('Bearer'))){
    const splitAuth = authorization.split(' ')
    request.token =  splitAuth[1]
  }
  else{
    request.token =  null
  }
  next()
}

const userExtractor = async (request, response,next) =>{
  const authorization = request.get('authorization')
  if(authorization && (authorization.startsWith('bearer') || authorization.startsWith('Bearer'))){
    const splitToken = authorization.split(' ')
    const verified = jwt.verify(splitToken[1],process.env.SECRET)
    const user = await User.findById(verified.id)

    request.user = user
  }
  else{
    request.user = null
  }
  next()

}
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}