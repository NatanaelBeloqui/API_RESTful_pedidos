import { Router } from 'express';
import userRoutes from './userRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;
