import { Order, Product, User } from '../models/index.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(400).json({ message: 'Usuário inválido.' });

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Produtos são obrigatórios.' });
    }

    const order = await Order.create({ userId });

    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        await order.destroy();
        return res.status(400).json({ message: `Produto inválido: ${item.productId}` });
      }
      await order.addProduct(product, { through: { quantity: item.quantity || 1 } });
    }

    const orderWithProducts = await Order.findByPk(order.id, {
      include: {
        model: Product,
        through: { attributes: ['quantity'] },
      },
    });

    return res.status(201).json(orderWithProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
};

export const findAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, through: { attributes: ['quantity'] } },
      ],
    });
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar pedidos.' });
  }
};

export const findOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, through: { attributes: ['quantity'] } },
      ],
    });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar pedido.' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { products } = req.body;

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Produtos são obrigatórios.' });
    }

    // Remove produtos antigos
    await order.setProducts([]);

    // Adiciona produtos novos
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Produto inválido: ${item.productId}` });
      }
      await order.addProduct(product, { through: { quantity: item.quantity || 1 } });
    }

    const updatedOrder = await Order.findByPk(order.id, {
      include: {
        model: Product,
        through: { attributes: ['quantity'] },
      },
    });

    return res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar pedido.' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });
    await order.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar pedido.' });
  }
};
