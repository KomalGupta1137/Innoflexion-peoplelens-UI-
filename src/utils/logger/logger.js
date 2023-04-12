import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [],
});

// if (process.env.NODE_ENV !== "production") {
logger.add(
  new transports.Console({
    handleExceptions: true,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.colorize(),
      format.simple(),
    ),
  }),
);
//   }

// overriding default console

export default logger;
