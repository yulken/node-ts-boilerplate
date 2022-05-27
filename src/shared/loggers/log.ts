import log4js from 'log4js';
import context from 'express-http-context';

log4js.addLayout('json', () => {
  return logEvent => {
    return JSON.stringify({
      'Transaction-Id': context.get('transactionId'),
      level: logEvent.level.levelStr,
      message: logEvent.data,
      path: `${logEvent.fileName}:${logEvent.lineNumber}:${logEvent.columnNumber}`,
      function: logEvent.functionName,
      thread: logEvent.pid,
      timestamp: logEvent.startTime
    });
  };
});

log4js.configure({
  appenders: { out: { type: 'stdout', layout: { type: 'json', separator: ','} } },
  categories: { default: { appenders: ['out'], level: 'debug', enableCallStack: true}}
});

export default log4js.getLogger('json');