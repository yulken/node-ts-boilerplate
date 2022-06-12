import { Router } from 'express';
import UsersController from './controllers/UsersController';
const router = Router();
const controller = new UsersController();

router.post('/', controller.createFromGithub);
router.get('/:username', controller.showFromGithub);

export default router;