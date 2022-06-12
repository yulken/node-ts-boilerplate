import log4js, { Log4js } from 'log4js';
import context from 'express-http-context';

log4js.addLayout('json', () => {
  return logEvent => {
    return JSON.stringify({
      'X-Request-Id': context.get('xRequestId'),
      level: logEvent.level.levelStr,
      message: logEvent.data,
      path: `${logEvent.fileName}:${logEvent.lineNumber}:${logEvent.columnNumber}`,
      function: logEvent.functionName,
      thread: logEvent.pid,
      timestamp: logEvent.startTime
    });
  };
});

const configureLogger = (instance: Log4js) => {
  const categories = { default: { appenders: ['out'], level: 'debug', enableCallStack: true}};

  if (process.env.ENVIRONMENT === 'local')
    return instance.configure({
      appenders: { out: { type: 'stdout' } },
      categories 
    });

  return instance.configure({
    appenders: { out: { type: 'stdout', layout: { type: 'json', separator: ','} } },
    categories
  });
};

configureLogger(log4js);


export default log4js.getLogger('json');