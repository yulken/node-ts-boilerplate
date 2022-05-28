/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send } from 'express';

declare global {
  namespace Express {
    export interface Response {
      sends(_content: any): Send<any, this> | void;
      jsons(_content: any): Send<any, this> | void;
      contentBody: any
    }
  }
}