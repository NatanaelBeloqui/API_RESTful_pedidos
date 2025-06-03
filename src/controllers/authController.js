import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database.js';
import { User } from '../models/user.js';

const userRepo = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || 'segredo123'; // ideal: usar variável de ambiente

// Registro de novo usuário (com senha criptografada)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) return res.status(400).json({ message: 'E-mail já está em uso' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({ name, email, password: hashedPassword });
    await userRepo.save(user);

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no registro', error: error.message });
  }
};

// Login com geração de token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error: error.message });
  }
};
