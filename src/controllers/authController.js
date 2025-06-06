import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database.js';
import { User } from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';

const userRepo = AppDataSource.getRepository(User);

// Registro de novo usuário (com validação e senha criptografada)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
    }

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
      role: 'user' // papel padrão, pode ajustar conforme sua lógica
    });

    await userRepo.save(user);

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro no registro, tente novamente mais tarde' });
  }
};

// Login com geração de token e validação básica
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    const user = await userRepo.findOneBy({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no login, tente novamente mais tarde' });
  }
};
