import { AppDataSource } from '../config/database.js';
import { Order } from '../models/order.js';
import { User } from '../models/user.js';
import { Product } from '../models/product.js';

const orderRepo = AppDataSource.getRepository(Order);
const userRepo = AppDataSource.getRepository(User);
const productRepo = AppDataSource.getRepository(Product);

// Criar pedido
export const createOrder = async (req, res) => {
  try {
    const { userId, productIds } = req.body;

    const user = await userRepo.findOneBy({ id: parseInt(userId) });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const products = await productRepo.findByIds(productIds);
    if (products.length !== productIds.length)
      return res.status(400).json({ message: 'Um ou mais produtos são inválidos' });

    const order = orderRepo.create({ user, products });
    await orderRepo.save(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: error.message });
  }
};

// Listar todos os pedidos
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderRepo.find({
      relations: ['user', 'products'],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: error.message });
  }
};

// Buscar pedido por ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderRepo.findOne({
      where: { id: parseInt(id) },
      relations: ['user', 'products'],
    });

    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: error.message });
  }
};

// Atualizar pedido (ex: trocar produtos)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { productIds } = req.body;

    const order = await orderRepo.findOne({
      where: { id: parseInt(id) },
      relations: ['products', 'user'],
    });

    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });

    if (productIds && productIds.length > 0) {
      const products = await productRepo.findByIds(productIds);
      if (products.length !== productIds.length)
        return res.status(400).json({ message: 'Um ou mais produtos são inválidos' });

      order.products = products;
    }

    await orderRepo.save(order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error: error.message });
  }
};

// Deletar pedido
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderRepo.findOneBy({ id: parseInt(id) });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });

    await orderRepo.remove(order);
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pedido', error: error.message });
  }
};
