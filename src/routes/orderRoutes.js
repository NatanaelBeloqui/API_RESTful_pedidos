import { Router } from 'express';
import auth from '../middlewares/authMiddleware.js';
import orderController from '../controllers/orderController.js';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gerenciamento de pedidos
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista os pedidos do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       401:
 *         description: Não autorizado
 *   post:
 *     summary: Cria um novo pedido com os produtos informados
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 description: Lista de IDs de produtos
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Requisição inválida (produtos ausentes ou inválidos)
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retorna um pedido específico pelo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       401:
 *         description: Não autorizado
 */

const router = Router();

router.use(auth);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrdersByUser);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.cancelOrder);

export default router;
