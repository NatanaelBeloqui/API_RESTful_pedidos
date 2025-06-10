import { Router } from 'express';
import userController from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.use(auth);

router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);
router.put('/me/password', userController.changePassword);
router.delete('/me', userController.deleteAccount);

export default router;
