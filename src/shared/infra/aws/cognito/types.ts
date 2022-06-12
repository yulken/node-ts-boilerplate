interface IAttribute {
  Name: string;
  Value: string;
}

type IAuthParametersType = {[key: string]: string}

interface ISignupRequest {
  ClientId: string;
  Password: string;
  Username: string;
  UserAttributes?: IAttribute[];
}

interface IAdminUpdateUserAttributesRequest {
  UserPoolId: string;
  Password: string;
  Username: string;
  UserAttributes: IAttribute[];
}

interface IAdminAddRemoveUserToGroupRequest {
  UserPoolId: string;
  Username: string;
  GroupName: string;
}

interface IResendConfirmationCodeRequest {
  ClientId: string;
  Username: string;
}

interface IAdminGetUserRequest {
  UserPoolId: string;
  Username: string;
}

interface IConfirmSignUpRequest {
  ClientId: string;
  Username: string;
  ConfirmationCode: string;
}

interface IForgotPasswordRequest {
  ClientId: string;
  Username: string;
}

interface IConfirmForgotPasswordRequest {
  ClientId: string;
  Username: string;
  ConfirmationCode: string;
  Password: string;
}

interface IInitiateAuthRequest {
  AuthFlow: string;
  ClientId: string;
  AuthParameters: IAuthParametersType;
}

interface IListUsersRequest {
  UserPoolId: string;
  AttributesToGet?: string[];
  Filter?: string;
}

export {
  IAttribute,
  ISignupRequest,
  IAdminUpdateUserAttributesRequest,
  IAdminAddRemoveUserToGroupRequest,
  IResendConfirmationCodeRequest,
  IAdminGetUserRequest,
  IConfirmSignUpRequest,
  IForgotPasswordRequest,
  IConfirmForgotPasswordRequest,
  IInitiateAuthRequest,
  IListUsersRequest
};