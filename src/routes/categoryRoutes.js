import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import categoryController from '../controllers/categoryController.js';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', auth, categoryController.createCategory);
router.put('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

export default router;
