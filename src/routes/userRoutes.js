import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = Router();

// Usuários (exemplo: somente admin pode listar usuários)
router.get('/', checkAuth, checkRole('admin'), getUsers);

export default router;
