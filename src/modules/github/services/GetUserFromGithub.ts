import axios, { AxiosError } from 'axios';
import config from '@shared/config';
import GithubResponseDTO, { IGetResponse } from '@github/dtos/GetResponseDTO';
import HttpError from '@shared/errors/HttpError';

const BASE_URL = config.github.baseUrl;

export default class GetUserFromGithub{
  async execute(username: string): Promise<GithubResponseDTO> {
    const response = await this.requestGithub(username);
    return new GithubResponseDTO(response);
  }

  async requestGithub(username: string): Promise<IGetResponse>{
    try{
      const response = await axios.get<IGetResponse>(`${BASE_URL}/users/${username}`);
      return response.data;
    }
    catch(err){
      if (!(err instanceof AxiosError))
        throw err;
      
      switch (err.response?.status){
      case 404:
        throw new HttpError('User not found');
      default:
        throw err;
      }
    }
  }
}