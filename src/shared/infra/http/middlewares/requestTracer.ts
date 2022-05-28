import log from '@shared/loggers/log';
import { Request, Response, NextFunction, Send } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resDotSendInterceptor = (res: Response, send: Send) => (content: any) => {
  res.contentBody = content;
  res.sends = send;
  return res.sends(content);
};

const logInput = (request: Request) => {
  log.info('HEADERS::', request.headers);
  log.info('PATH::', request.method.toUpperCase(), request.originalUrl);
  request.body.length && log.info('BODY::', request.body);
};

const logOutput = (response: Response) => {
  response.contentBody && log.info('RESPONSE::', JSON.parse(response.contentBody));
};
  

const requestTracer = (request: Request, response: Response, next: NextFunction) => {
  logInput(request);

  response.send = resDotSendInterceptor(response, response.send);
  response.on('finish', () => logOutput(response));

  next();
};

export {
  requestTracer 
};