import { AppDataSource } from '../config/database.js';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const canUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    // Verifica se o usuário logado é o mesmo que está tentando ser alterado
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Você não tem permissão para atualizar este usuário.' });
    }

    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role) user.role = role; // Se você quiser restringir essa parte, pode remover essa linha

    await userRepository.save(user);

    return res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
};
