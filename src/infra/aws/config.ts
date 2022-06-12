import config from '@shared/config';
import log from '@shared/loggers/log';
import AWS, { AWSError } from 'aws-sdk';

AWS.config.update({
  region: config.aws.region
});

const isAWSError = (err: unknown): err is AWSError =>{
  if ((err as AWSError).code !== undefined){
    log.error(err);
    return true;
  }
  return false;
};

export { isAWSError };
export default AWS;