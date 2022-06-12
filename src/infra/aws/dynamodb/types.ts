interface IDynamoBaseParams {
  TableName: string;
}

export interface IDynamoGetParams extends IDynamoBaseParams {
  Key: {
    [key: string]: string
  },
}

export interface IDynamoPutParams extends IDynamoBaseParams {
  Item: {
    [key: string]: string
  },
}