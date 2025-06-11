import { Router } from 'express';
import categoryRoutes from './categoryRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import userRoutes from './userRoutes.js';
import auth from '../middlewares/authMiddleware.js';

const router = Router();

router.use('/users', userRoutes);

router.use('/categories', auth, categoryRoutes);
router.use('/products', auth, productRoutes);
router.use('/orders', auth, orderRoutes);

export default router;
