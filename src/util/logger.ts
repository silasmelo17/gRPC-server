
import winston from 'winston';

export function createLogger() {
    const { combine, timestamp, json, colorize, printf } = winston.format;

    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: combine(
            colorize({ level: true }),
            timestamp({
                format: 'YYYY-MM-DD hh:mm:ss.SSS',
            }),
            json(),
            printf((info) => {
                return `${info.timestamp} ${info.level} | ${info.message}`
            })
        ),
        transports: [new winston.transports.Console()],
    });
}
