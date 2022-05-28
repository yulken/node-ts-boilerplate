import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import httpContext from 'express-http-context';
import { handleErrors } from './middlewares/handleErrors';
import { requestTracer } from './middlewares/requestTracer';
import { setTransactionId } from './middlewares/setTransactionId';
import routes from './routes/routes';

const server = express();
server.set('port', 8080);

server.use(express.json());
server.use(cors());
server.use(httpContext.middleware);
server.use(setTransactionId);
server.use(requestTracer);

server.use(routes);

server.use(handleErrors);
export default server;