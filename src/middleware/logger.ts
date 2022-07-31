import { NextFunction, Request, Response } from "express";
import { createLogger, transports, format } from "winston";
const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ dirname: "logs", filename: 'logger.log' })
    ],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    exceptionHandlers: [
        new transports.File({ dirname: "logs", filename: 'exceptions.log' })
    ]
});
export default logger;