import mongoose from "mongoose";
import { TUser } from "./auth.interface";
import { Auth } from "./auth.model";
import AppError from "../../error/AppError";


const createUserIntoDB = async (payload: TUser) => {

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const newUser = await Auth.create(payload)


        await session.commitTransaction()
        await session.endSession()
        return newUser
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}

export const userServices = {
    createUserIntoDB
}