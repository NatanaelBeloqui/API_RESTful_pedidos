import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const saltRounds = 10; // Para o bcrypt

// Criar usuário
export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Verificar se já existe usuário com o mesmo username
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar usuário no banco
    const newUser = await User.create({ username, password: hashedPassword, role });

    return res.status(201).json({ id: newUser.id, username: newUser.username, role: newUser.role });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
  }
};

// Login do usuário
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuário
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Usuário ou senha inválidos.' });

    // Comparar senha
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Usuário ou senha inválidos.' });

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};

// Listar usuários (somente admin)
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'role'] });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar usuários.', error: error.message });
  }
};

// Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, saltRounds);
    if (role) user.role = role;

    await user.save();
    return res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    await user.destroy();
    return res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar usuário.', error: error.message });
  }
};
