import { AppDataSource } from '../config/database.js';
import { Category } from '../models/category.js';

const categoryRepo = AppDataSource.getRepository(Category);

// Criar categoria
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = categoryRepo.create({ name });
    await categoryRepo.save(category);

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
  }
};

// Listar todas as categorias
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryRepo.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error: error.message });
  }
};

// Buscar uma categoria por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryRepo.findOneBy({ id: parseInt(id) });

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categoria', error: error.message });
  }
};

// Atualizar uma categoria
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await categoryRepo.findOneBy({ id: parseInt(id) });
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    category.name = name;
    await categoryRepo.save(category);

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error: error.message });
  }
};

// Deletar uma categoria
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryRepo.findOneBy({ id: parseInt(id) });
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await categoryRepo.remove(category);
    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar categoria', error: error.message });
  }
};
