import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database.js';
import { User } from '../models/user.js';

const userRepository = AppDataSource.getRepository(User);

// Função para criar (cadastrar) um novo usuário
export const createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já cadastrado com este e-mail.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = userRepository.create({
      nome,
      email,
      senha: hashedPassword,
    });

    await userRepository.save(newUser);

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Função para login e geração de token JWT
export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
