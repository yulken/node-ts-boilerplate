import HttpError from '@shared/errors/HttpError';
import aws, { isAWSError } from '../config';

import {
  IAdminAddRemoveUserToGroupRequest,
  IAdminGetUserRequest,
  IAdminUpdateUserAttributesRequest,
  IConfirmForgotPasswordRequest,
  IConfirmSignUpRequest,
  IForgotPasswordRequest,
  IInitiateAuthRequest,
  IListUsersRequest,
  IResendConfirmationCodeRequest,
  ISignupRequest,
} from './types';

const cognito = new aws.CognitoIdentityServiceProvider();

export default class Cognito {

  async initiateAuth({
    AuthFlow = 'USER_PASSWORD_AUTH',
    ClientId,
    AuthParameters
  }: IInitiateAuthRequest) {
    try{
      return cognito.initiateAuth({
        AuthFlow,
        ClientId,
        AuthParameters
      }).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error;

      switch (error.code) {
      case 'UserNotConfirmedException':
        throw new HttpError('User not confirmed');
      case 'NotAuthorizedException':
        throw new HttpError('Invalid user or password');
      case 'LimitExceededException':
        throw new HttpError('Limit of attempts exceeded, try again later.');
      default:
        throw new HttpError('User not found');
      }
    }
  }

  async getUser(params: IAdminGetUserRequest) {
    try {
      return cognito.adminGetUser(params).promise();
    }
    catch (error) {
      if (!isAWSError(error)) throw error;

      switch (error.code) {
      case 'UserNotConfirmedException':
        throw new HttpError('User not confirmed');
      case 'NotAuthorizedException':
        throw new HttpError('Invalid user or password');
      case 'LimitExceededException':
        throw new HttpError('Limit of attempts exceeded, try again later.');
      default:
        throw new HttpError('User not found');
      }
    }
  }

  async listUsers(params: IListUsersRequest){
    return cognito.listUsers(params).promise();
  }

  async signUp(params: ISignupRequest) {
    try {
      return cognito.signUp(params).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error;

      if (error.statusCode === 400) 
        throw new HttpError('Error on user registration');
    }
  }

  async confirmSignUp(params: IConfirmSignUpRequest){
    try{
      return cognito.confirmSignUp(params).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error; 
      
      if (error.code === 'LimitExceededException' ) 
        throw new HttpError('Limit of attempts exceeded, try again later.');
      if (error.statusCode === 400)
        throw new HttpError('Invalid Code, try resending');
    }
  }

  async resendConfirmationCode(params: IResendConfirmationCodeRequest) {
    try{
      return cognito.resendConfirmationCode(params).promise();  
    }
    catch (error) {
      if (!isAWSError(error)) throw error; 

      switch (error.code) {
      case 'CodeDeliveryFailureException':
        throw new HttpError('Failure on resend confirmation code');
      case 'UserNotFoundException':
        throw new HttpError('User not Found');
      case 'LimitExceededException':
        throw new HttpError('Limit of attempts exceeded, try again later.');
      default:
        throw new HttpError('Error on resend confirmation code');
      }
    }
  }

  async updateAttributes(params: IAdminUpdateUserAttributesRequest) {
    try{
      return cognito.adminUpdateUserAttributes(params).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error; 
      
      if (error.code === 'UserNotFoundException')
        throw new HttpError('User not found.');
      if (error.code === 'LimitExceededException' ) 
        throw new HttpError('Limit of attempts exceeded, try again later.');
      if (error.statusCode === 400)
        throw new HttpError('Error on User update');
    }
  }

  async addUserToGroup(params: IAdminAddRemoveUserToGroupRequest) {
    try{
      return cognito.adminAddUserToGroup(params).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error; 
      
      if (error.code === 'UserNotFoundException')
        throw new HttpError('User not found.');
      if (error.code === 'LimitExceededException' ) 
        throw new HttpError('Limit of attempts exceeded, try again later.');
      if (error.statusCode === 400)
        throw new HttpError('Error on User update');
    }
  }

  async removeUserFromGroup(params: IAdminAddRemoveUserToGroupRequest) {
    try{
      return cognito.adminRemoveUserFromGroup(params).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error;
      
      if (error.code === 'UserNotFoundException')
        throw new HttpError('User not found.');
      if (error.code === 'LimitExceededException' ) 
        throw new HttpError('Limit of attempts exceeded, try again later.');
      if (error.statusCode === 400)
        throw new HttpError('Error on User update');
    }
  }

  async forgotPassword(params: IForgotPasswordRequest){
    try{
      return cognito.forgotPassword(params).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error; 

      if (error.code === 'LimitExceededException' ) 
        throw new HttpError('Limit of attempts exceeded, try again later.');
      if (error.statusCode === 400)
        throw new HttpError('Invalid Code, try resending');
    }
  }

  async confirmForgotPassword(params: IConfirmForgotPasswordRequest){
    try{
      return cognito.confirmForgotPassword(params).promise();
    }
    catch(error){
      if (!isAWSError(error)) throw error; 

      switch (error.code) {
      case 'ExpiredCodeException':
        throw new HttpError('Code expired. Resend new code required');
      case 'CodeMismatchException':
        throw new HttpError('Invalid code. Resend new code if needed');
      case 'UserNotFoundException':
        throw new HttpError('User not Found');
      case 'LimitExceededException':
        throw new HttpError('Limit of attempts exceeded, try again later.');
      default:
        throw new HttpError('Error on confirm password');
      }
    }
  }

}