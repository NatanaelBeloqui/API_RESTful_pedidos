// import { Router } from 'express';
// import {
//   createCategory,
//   getAllCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
// } from '../controllers/categoryController.js';

// const router = Router();

// router.post('/categories', createCategory);
// router.get('/categories', getAllCategories);
// router.get('/categories/:id', getCategoryById);
// router.put('/categories/:id', updateCategory);
// router.delete('/categories/:id', deleteCategory);

// export default router;

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

router.post('/categories', verifyToken, createCategory);
router.get('/categories', verifyToken, getAllCategories);
router.get('/categories/:id', verifyToken, getCategoryById);
router.put('/categories/:id', verifyToken, updateCategory);
router.delete('/categories/:id', verifyToken, deleteCategory);

export default router;