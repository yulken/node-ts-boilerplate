interface IHttpError{
    message: string;
    statusCode: number;
}

export default class HttpError extends Error{
  public readonly message: string;
  public readonly statusCode: number;

  constructor({
    message,
    statusCode
  }: IHttpError){
    super(message);
    this.statusCode = statusCode;
  }
}