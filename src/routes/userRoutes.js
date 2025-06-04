import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

// Rota pública (criar conta)
router.post('/', userController.createUser);

// Rota pública (login)
router.post('/login', userController.loginUser);

// Rota protegida (qualquer usuário logado)
router.get('/me', checkAuth, (req, res) => {
  res.json({ user: req.user }); // Exemplo de rota protegida
});

// Rota protegida (apenas administradores)
router.get('/', checkAuth, isAdmin, userController.getUsers);

// Atualizar e deletar também devem ser protegidas (por segurança)
router.put('/:id', checkAuth, isAdmin, userController.updateUser);
router.delete('/:id', checkAuth, isAdmin, userController.deleteUser);

export default router;
