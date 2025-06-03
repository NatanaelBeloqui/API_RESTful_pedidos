import { Router } from 'express';
import { createOrder } from '../controllers/orderController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

// Pedidos
router.post('/', checkAuth, createOrder);

export default router;
