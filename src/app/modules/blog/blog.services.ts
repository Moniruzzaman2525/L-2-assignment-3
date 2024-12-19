import mongoose, { Schema } from "mongoose"
import { TBlog } from "./blog.interface"
import { Blog } from "./blog.model"
import AppError from "../../error/AppError"
import { TUser } from "../auth/auth.interface"
import { AuthUser } from "../auth/auth.model"



const createBlogIntoDB = async (payload: TBlog, userEmail: string) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const user = await AuthUser.isUserExistsByEmail(userEmail)
        if (!user || !user._id) {
            throw new AppError(404, 'User not found or invalid user ID')
        }
        payload.author = user._id
        const newBlog = (await Blog.create(payload)).populate('author')
        await session.commitTransaction()
        await session.endSession()
        return newBlog
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}
const updateBlogFromDB = async (payload: TBlog, userEmail: string, id: string) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const user = await AuthUser.isUserExistsByEmail(userEmail)
        if (!user || !user._id) {
            throw new AppError(404, 'User not found !')
        }
        const blog = await Blog.findById(id).session(session)
        if (!blog) {
            throw new AppError(404, 'Blog not found !')
        }

        if (blog.author.toString() !== user._id.toString()) {
            throw new AppError(403, 'You are not authorized to update this blog !');
        }
        const updateBlog = await Blog.findByIdAndUpdate(
            id,
            { ...payload },
            { new: true, session },
          ).populate('author')
       
        await session.commitTransaction()
        await session.endSession()
        return updateBlog
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}


export const blogServices = {
    createBlogIntoDB,
    updateBlogFromDB
}