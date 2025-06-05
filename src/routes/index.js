import { Router } from 'express';

import categoryRoutes from './categoryRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

// Agrupando todas as rotas corretamente
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/auth', authRoutes);

export default router;
