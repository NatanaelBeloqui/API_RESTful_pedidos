import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import orderController from '../controllers/orderController.js';

const router = Router();

router.use(auth);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrdersByUser);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.cancelOrder);

export default router;
