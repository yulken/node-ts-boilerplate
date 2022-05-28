import httpContext from 'express-http-context';
import { Request, Response, NextFunction }  from 'express';
import { v4 as uuid } from 'uuid';

const setTransactionId = (request: Request, _response: Response, next: NextFunction) => {
  const transactionId = request.headers['transaction-id'] ??uuid();
  httpContext.set('transactionId', transactionId);

  next();
};


export {
  setTransactionId
};