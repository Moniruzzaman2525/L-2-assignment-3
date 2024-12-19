import mongoose, { Schema } from "mongoose"
import { TBlog } from "./blogs.interface"
import { Blog } from "./blogs.model"
import AppError from "../../error/AppError"
import { AuthUser } from "../auth/auth.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { BlogSearchableFields } from "./blogs.constant"



const createBlogIntoDB = async (payload: TBlog, userEmail: string) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const user = await AuthUser.isUserExistsByEmail(userEmail)
        if (!user || !user._id) {
            throw new AppError(404, 'User not found !')
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
const deleteBlogFromDB = async (userEmail: string, id: string) => {
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
        const deleteBlog = await Blog.findByIdAndDelete(id)

        await session.commitTransaction()
        await session.endSession()
        return deleteBlog
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}


const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(
        Blog.find().populate('author', 'name email'),
        query
    )
        .search(BlogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();


    const result = await blogQuery.modelQuery;
    return result;
};



export const blogServices = {
    createBlogIntoDB,
    updateBlogFromDB,
    deleteBlogFromDB,
    getAllBlogsFromDB
}