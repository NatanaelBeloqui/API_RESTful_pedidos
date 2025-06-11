import { Router } from 'express';
import auth from '../middlewares/authMiddleware.js';
import * as orderController from '../controllers/orderController.js';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gerenciamento de pedidos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
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
 *                 description: Lista de produtos com seus respectivos IDs e quantidades
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos

 *   get:
 *     summary: Lista todos os pedidos do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 3
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                         price:
 *                           type: number
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado

 *   delete:
 *     summary: Cancela um pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido a ser cancelado
 *     responses:
 *       204:
 *         description: Pedido cancelado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */

const router = Router();

router.use(auth);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrdersByUser);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.cancelOrder);

export default router;
