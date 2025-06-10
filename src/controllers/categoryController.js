import { Category } from '../models/index.js';

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Category.findOne({ where: { name } });
    if (existing) return res.status(409).json({ message: 'Categoria já existe.' });
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar categoria.' });
  }
};

export const findAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar categorias.' });
  }
};

export const findCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada.' });
    return res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar categoria.' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada.' });
    if (name) category.name = name;
    await category.save();
    return res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar categoria.' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada.' });
    await category.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar categoria.' });
  }
};
