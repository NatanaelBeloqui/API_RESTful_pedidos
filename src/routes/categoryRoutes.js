import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/', verifyToken, createCategory);
router.get('/', verifyToken, getAllCategories);
router.get('/:id', verifyToken, getCategoryById);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;