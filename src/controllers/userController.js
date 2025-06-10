import bcrypt from 'bcrypt';
import { User } from '../models/index.js'; // Ajuste conforme sua estrutura

const saltRounds = 10;

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    // Hashear a senha
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};

export const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // não retornar senha
    });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualiza campos básicos
    if (name) user.name = name;
    if (email) user.email = email;

    // Se tiver senha nova, hash ela
    if (password) {
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();

    // Retorna sem senha
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await user.destroy();

    return res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};
