import * as userController from '../controllers/userController.js';
import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { canUpdateUser } from '../middlewares/canUpdateUser.js';

const router = Router();

router.post('/', userController.createUser);

router.post('/login', userController.loginUser);

router.get('/me', checkAuth, (req, res) => {
  res.json({ user: req.user });
});

router.get('/', checkAuth, isAdmin, userController.getUsers);

router.get('/:id', checkAuth, (req, res) => {
  const requestedId = parseInt(req.params.id);
  const loggedUserId = req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (requestedId === loggedUserId || isAdmin) {
    return userController.getUserById(req, res);
  }

  return res.status(403).json({ message: 'Acesso negado.' });
});

router.put('/:id', checkAuth, canUpdateUser, userController.updateUser);

router.put('/:id', checkAuth, isAdmin, userController.updateUser);

router.delete('/:id', checkAuth, isAdmin, userController.deleteUser);

export default router;
