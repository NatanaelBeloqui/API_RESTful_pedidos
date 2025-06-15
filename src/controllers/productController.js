import { Product, Category } from '../models/index.js';

export const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(400).json({ message: 'Categoria inválida.' });
    const product = await Product.create({ name, price, categoryId });
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar produto.' });
  }
};

export const findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: { model: Category, as: 'category' } });
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
};

export const findProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: { model: Category, as: 'category' } });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar produto.' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) return res.status(400).json({ message: 'Categoria inválida.' });
      product.categoryId = categoryId;
    }

    if (name) product.name = name;
    if (price) product.price = price;

    await product.save();
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    await product.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar produto.' });
  }
};
