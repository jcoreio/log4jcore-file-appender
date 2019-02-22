const path = require('path')

const { logger, setLogFunctionProvider } = require('log4jcore')
const { createFileAppender } = require('../index')

const file = path.join(__dirname, 'log.txt')
setLogFunctionProvider(createFileAppender({ file }))

const log = logger('loggerName')
log.info('testing my logger')
