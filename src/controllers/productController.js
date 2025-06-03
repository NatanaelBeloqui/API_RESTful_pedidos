import { AppDataSource } from '../config/database.js';
import { Product } from '../models/product.js';
import { Category } from '../models/category.js';

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

// Criar produto
export const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    const category = await categoryRepo.findOneBy({ id: parseInt(categoryId) });
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    const product = productRepo.create({ name, price, category });
    await productRepo.save(product);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
  }
};

// Listar todos os produtos
export const getAllProducts = async (req, res) => {
  try {
    const products = await productRepo.find({ relations: ['category'] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
};

// Buscar produto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productRepo.findOne({
      where: { id: parseInt(id) },
      relations: ['category'],
    });

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

// Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;

    const product = await productRepo.findOneBy({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    if (categoryId) {
      const category = await categoryRepo.findOneBy({ id: parseInt(categoryId) });
      if (!category) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }
      product.category = category;
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;

    await productRepo.save(product);

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

// Deletar produto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productRepo.findOneBy({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await productRepo.remove(product);
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
  }
};
