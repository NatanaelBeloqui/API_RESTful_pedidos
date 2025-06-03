import { Router } from 'express';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

export default router;
