const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        // Error log
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combines.log'})
    ]
})

module.exports = logger;