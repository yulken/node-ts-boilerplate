import { Request, Response, NextFunction } from 'express';
import HttpError from '@shared/errors/HttpError';
import log from '@shared/loggers/log';
    
const handleErrors = async (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  log.error(error);
  if (error instanceof HttpError)
    return response.status(error.statusCode).json({message: error.message});

  return response.status(500).json({message: 'An Internal Error has Ocurred'}); 
};

export {
  handleErrors
};