import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/auth/auth.interface";
import { AuthUser } from "../modules/auth/auth.model";


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'You are not authorized!');
    }
    
    const token = authHeader.split(' ')[1];
    

    // if the token is send from client
    if (!token) {
      throw new AppError(401, 'You are not authorized !')
    }

    // check if the token is valid
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload

    const { role, email, iat } = decoded
    const user = await AuthUser.isUserExistsByEmail(email)

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }

    if (user?.isBlocked) {
      throw new AppError(401, 'This user is blocked !');
    }

    // checking role 
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized !')
    }
    req.user = decoded as JwtPayload
    next()
  })
};


export default auth
