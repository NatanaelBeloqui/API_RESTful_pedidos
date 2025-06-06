import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/', verifyToken, createProduct);
router.get('/', verifyToken, getAllProducts);
router.get('/:id', verifyToken, getProductById);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;