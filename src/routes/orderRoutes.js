import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

// Criar pedido
router.post('/', checkAuth, createOrder);

// Listar todos os pedidos
router.get('/', checkAuth, getAllOrders);

// Buscar pedido por ID
router.get('/:id', checkAuth, getOrderById);

// Atualizar pedido
router.put('/:id', checkAuth, updateOrder);

// Deletar pedido
router.delete('/:id', checkAuth, deleteOrder);

export default router;
