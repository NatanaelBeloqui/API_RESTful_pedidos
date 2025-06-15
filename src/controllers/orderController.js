import { Order, Product, User } from '../models/index.js';

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // pegar do token
    const { products } = req.body;

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
      // Usa o alias 'products' para o método gerado pelo belongsToMany
      await order.addProduct(product, { through: { quantity: item.quantity || 1 } });
    }

    const orderWithProducts = await Order.findByPk(order.id, {
      include: {
        model: Product,
        as: 'products',  // usar alias exato definido nas associações
        through: { attributes: ['quantity'] },
      },
    });

    return res.status(201).json(orderWithProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id }, // certifique que a FK está 'user_id' conforme seu model
      include: [
        {
          model: Product,
          as: 'products',  // importante usar o alias da associação
          through: { attributes: ['quantity'] },
        },
      ],
    });
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar pedidos.' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: 'products',  // mesmo alias aqui
          through: { attributes: ['quantity'] },
        },
      ],
    });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar pedido.' });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });
    await order.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cancelar pedido.' });
  }
};

export default {
  createOrder,
  getOrdersByUser,
  getOrderById,
  cancelOrder,
};
