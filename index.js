const app = require('./app')
const constants = require('./utils/config')
const logger = require('./utils/logger')


const PORT = constants.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})