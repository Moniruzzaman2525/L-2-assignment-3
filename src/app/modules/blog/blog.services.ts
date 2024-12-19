import mongoose from "mongoose"
import { TBlog } from "./blog.interface"
import { Blog } from "./blog.model"
import AppError from "../../error/AppError"



const createBlogIntoDB = async (payload: TBlog) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const newBlog = await Blog.create(payload)
        await session.commitTransaction()
        await session.endSession()
        return newBlog
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}


export const blogServices = {
    createBlogIntoDB
}