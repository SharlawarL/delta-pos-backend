const winston = require('winston');
const moment = require('moment/moment')

const logger = winston.createLogger({
  level: 'info', // Set the minimum log level (e.g., 'debug', 'info', 'warn', 'error')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({   
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'Logs/'+moment().format('YYYY_MM_DD')+'/error_'+moment().format('YYYY_MM_DD')+'.log',
      level: 'error'
    })
  ]
});

module.exports = logger;