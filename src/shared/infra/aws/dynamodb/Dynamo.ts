import aws from '../config';
import { IDynamoGetParams, IDynamoPutParams } from './types';

const documentClient = new aws.DynamoDB.DocumentClient();

export default class Dynamo {
  static async putItem(params: IDynamoPutParams) {
    return documentClient.put(params).promise();
  }

  static async getItem(params: IDynamoGetParams) {
    return documentClient.get(params).promise();
  }
}
