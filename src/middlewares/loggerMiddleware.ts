import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info({
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
  });
  next();
};
