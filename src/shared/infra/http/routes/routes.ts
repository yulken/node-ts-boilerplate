import { Router } from 'express';
import githubRoutes from '@github/infra/http/routes';

const router = Router();

router.use('/users', githubRoutes);

export default router;