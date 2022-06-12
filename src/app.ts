import '@shared/loggers/ddTracer';
import server from '@infra/http/server';
import log from '@shared/loggers/log';

server.listen(server.settings.port, () => {
  log.info(`Application running in port ${server.settings.port}`);
});