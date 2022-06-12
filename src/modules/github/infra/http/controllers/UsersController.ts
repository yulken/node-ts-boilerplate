import { Request, Response }  from 'express';
import CreateUserFromGithub from '@github/services/CreateUserFromGithub';

export default class UsersController {
  async createFromGithub(request: Request, response: Response){
    const { username } = request.body;
    
    const service = new CreateUserFromGithub();
    await service.execute(username);

    return response.status(201).send();
  }
}