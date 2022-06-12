import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import httpContext from 'express-http-context';
import { handleErrors } from './middlewares/handleErrors';
import { interceptLogs } from './middlewares/responseInterceptor';
import { setXRequestId } from './middlewares/setXRequestId';
import routes from './routes/routes';

const server = express();
server.set('port', 8080);

server.use(express.json());
server.use(cors());
server.use(httpContext.middleware);

server.use(setXRequestId);
server.use(interceptLogs);

server.use(routes);

server.use(handleErrors);
export default server;