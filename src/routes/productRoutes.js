import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import productController from '../controllers/productController.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

export default router;
