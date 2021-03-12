import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({
      filename: 'progress.log',
      level: 'debug'
    }),
    new winston.transports.File({
      filename: 'copped.log',
      level: 'verbose'
    }),
    new winston.transports.File({ filename: 'combined.log', level: 'error' })
  ]
})

logger.add(
  new winston.transports.Console({
    format: winston.format.simple()
  })
)
