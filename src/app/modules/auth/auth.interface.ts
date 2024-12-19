import { Model } from "mongoose";


export interface TUser {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
    isBlocked?: boolean
}


export interface UserModel extends Model<TUser> {
    isUserExistsByUserId(email: string): Promise<TUser>
    isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>
}

export type TUserLogin = {
    email: string;
    password: string
}