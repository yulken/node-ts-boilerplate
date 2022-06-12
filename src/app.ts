import '@shared/loggers/ddTracer';
import server from '@shared/infra/http/server';
import log from '@shared/loggers/log';

server.listen(server.settings.port, () => {
  log.info(`Application running in port ${server.settings.port}`);
});