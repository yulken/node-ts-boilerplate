import axios from 'axios';
import config from '@shared/config';
import log from '@shared/loggers/log';

const BASE_URL = config.github.baseUrl;

export default class CreateUserFromGithub{
  async execute(username: string){
    const data = await axios.get(`${BASE_URL}/users/${username}`);
    log.debug(data);
    return username;
  }
}