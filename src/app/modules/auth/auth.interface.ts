import { Model, Types } from "mongoose";
import { USER_ROLE } from "./auth.constant";


export interface TUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
    isBlocked?: boolean
}


export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>
    isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>
}

export type TUserLogin = {
    email: string;
    password: string
}

export type TUserRole = keyof typeof USER_ROLE