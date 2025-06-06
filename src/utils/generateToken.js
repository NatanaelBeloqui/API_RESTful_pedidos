import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secreta123';

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};
