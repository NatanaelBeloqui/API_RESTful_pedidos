import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { verifyToken } from '../middlewares/verifyToken.js'; // ✅ Esse é o correto

const router = Router();

// Criar pedido
router.post('/', verifyToken, createOrder);

// Listar todos os pedidos
router.get('/', verifyToken, getAllOrders);

// Buscar pedido por ID
router.get('/:id', verifyToken, getOrderById);

// Atualizar pedido
router.put('/:id', verifyToken, updateOrder);

// Deletar pedido
router.delete('/:id', verifyToken, deleteOrder);

export default router;
