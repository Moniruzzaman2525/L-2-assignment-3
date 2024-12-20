import mongoose from "mongoose"
import { AuthUser } from "../auth/auth.model"
import AppError from "../../error/AppError"
import { Blog } from "../blogs/blogs.model"

// user block services
const adminBlockUserFromDB = async (id: string) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const user = await AuthUser.findById(id)
        if (!user || !user._id) {
            throw new AppError(404, 'User not found !')
        }
        const blockUser = await AuthUser.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true, session },
        )

        await session.commitTransaction()
        await session.endSession()
        return blockUser
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}

// blog delete services
const adminBlogDeleteFromDB = async (id: string) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const blog = await Blog.isUserExistsById(id)
        if (!blog) {
            throw new AppError(404, 'Blog not found !')
        }
        const deleteBlog = await Blog.findByIdAndDelete(id)
        
        await session.commitTransaction()
        await session.endSession()
        return deleteBlog
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        console.log(error);
        
        throw new AppError(500, error)
    }
}

export const adminServices = {
    adminBlockUserFromDB,
    adminBlogDeleteFromDB
}