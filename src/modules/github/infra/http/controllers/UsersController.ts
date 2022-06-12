import { Request, Response }  from 'express';
import CreateUserFromGithub from '@github/services/CreateUserFromGithub';
import GetUserFromGithub from '@github/services/GetUserFromGithub';

export default class UsersController {
  async createFromGithub(request: Request, response: Response){
    const { username } = request.body;
    
    const service = new CreateUserFromGithub();
    await service.execute(username);

    return response.status(201).send();
  }

  async showFromGithub(request: Request, response: Response){
    const { username } = request.params;
    
    const service = new GetUserFromGithub();
    const result = await service.execute(username);

    return response.status(200).json(result);
  }
}