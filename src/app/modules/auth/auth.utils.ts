import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const createToken = (
  jwtPayload: { userId: mongoose.Types.ObjectId; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
