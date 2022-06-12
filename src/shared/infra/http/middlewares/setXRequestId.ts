import httpContext from 'express-http-context';
import { Request, Response, NextFunction }  from 'express';
import { v4 as uuid } from 'uuid';

const setXRequestId = (request: Request, _response: Response, next: NextFunction) => {
  const xRequestId = request.headers['x-request-id'] ?? uuid();
  httpContext.set('xRequestId', xRequestId);

  next();
};


export {
  setXRequestId
};