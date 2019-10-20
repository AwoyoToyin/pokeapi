import fs from 'fs';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

/** Configuring logger */
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

/** Custom log format */
const customFormat = printf(info => `${info.timestamp} ${info.message}`);

const date = new Date();

const logger = createLogger({
    level: 'info',
    format: combine(
        format.colorize(),
        label({ label: 'winston!' }),
        timestamp(),
        customFormat,
    ),
    transports: [
        /** Write all error level logs to `logs/current-date-error.log` file */
        new transports.File({ filename: `${logDir}/error-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.log`, level: 'error' }),

        /** Write all info level logs to `logs/current-date-access.log` file */
        new transports.File({ filename: `${logDir}/access-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.log`, level: 'info' }),

        /** Write all logs to `logs/combined.log` file */
        new transports.File({ filename: `${logDir}/combined.log` }),
    ],
    exitOnError: false,
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            format.colorize(),
            label({ label: 'winston!' }),
            timestamp(),
            customFormat,
        ),
    }));
}

export default logger;
