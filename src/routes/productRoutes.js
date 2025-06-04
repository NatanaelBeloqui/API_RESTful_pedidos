// import { Router } from 'express';
// import {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from '../controllers/productController.js';

// const router = Router();

// // Produtos
// router.post('/', createProduct);
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

// export default router;

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

router.post('/products', verifyToken, createProduct);
router.get('/products', verifyToken, getAllProducts);
router.get('/products/:id', verifyToken, getProductById);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

export default router;