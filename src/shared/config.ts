import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import log from './loggers/log';

const VARIABLE_PATTERN  = /\$\{(\w*)\}/g;

const replaceWithEnvVariable = (matchedParams: RegExpMatchArray, line: string) => {
  const [patternMatched, valueMatched] = matchedParams;
  log.debug('Replacing env variable ::', valueMatched);
  const envValue = process.env[valueMatched];

  if (!envValue)
    throw new Error(`${valueMatched} not declared on environment`);

  return line.replace(patternMatched, envValue);
};

const getConfigFrom = (configPath: string) => {
  let configString = fs.readFileSync(configPath, 'utf-8');
  const arrayMatch = configString.matchAll(VARIABLE_PATTERN);
  for (const match of arrayMatch){
    configString = replaceWithEnvVariable(match, configString);
  }

  return JSON.parse(configString);
};

const resourcesPath = path.join(__dirname, '..', 'resources');

if (!fs.existsSync(`${resourcesPath}/config.json`)){
  log.error('Config properties not found!');
  throw new Error('Application config.json not found!');
}

log.info('Reading default properties');
const config = getConfigFrom(`${resourcesPath}/config.json`);
const env = process.env['ENVIRONMENT'];
if (!env) throw new Error('ENVIRONMENT variable not set!');
const configEnvPath = `${resourcesPath}/config-${env}.json`;

if (fs.existsSync(configEnvPath)){
  log.info(`Reading profile ${env} properties`);
  const configEnv = getConfigFrom(configEnvPath);
  _.merge(config, configEnv);
}

log.debug('Config properties read with success');
export default Object.freeze({...config});
