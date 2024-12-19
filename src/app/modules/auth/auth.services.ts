import mongoose from "mongoose";
import { TUser, TUserLogin } from "./auth.interface";
import { AuthUser } from "./auth.model";
import AppError from "../../error/AppError";
// import { generatedStudentId } from "./auth.utils";
import jwt from 'jsonwebtoken';
import config from "../../config";
import { createToken } from "./auth.utils";

const createUserIntoDB = async (payload: TUser) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // payload.id = await generatedStudentId()
        const newUser = await AuthUser.create(payload)
        await session.commitTransaction()
        await session.endSession()
        return newUser
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}

const loginUserServices = async (payload: TUserLogin) => {
    const user = await AuthUser.isUserExistsByUserId(payload.email)
    if (!user) {
        throw new AppError(404, 'This user is not found !')
    }
    const passMatch = await AuthUser.isPasswordMatch(payload.password, user.password)

    if (!passMatch) {
        throw new AppError(403, 'Invalid credentials')
    }

    const isBlocked = user.isBlocked
    if (isBlocked) {
        throw new AppError(403, 'This user is blocked !')
    }

    // create token and sent to the user
    const jwtPaylod = {
        userId: user._id as mongoose.Types.ObjectId,
        role: user.role as string
    }

    const accessToken = createToken(jwtPaylod, config.jwt_access_secret as string, config.jwt_access_expires_in as string)
    const refreshToken = createToken(jwtPaylod, config.jwt_access_secret as string, config.jwt_refresh_expires_in as string)

    return { accessToken , refreshToken}

}

export const userServices = {
    createUserIntoDB,
    loginUserServices
}