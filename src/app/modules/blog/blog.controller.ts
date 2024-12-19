import AppError from "../../error/AppError"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { blogServices } from "./blog.services"


const createBlogController = catchAsync(async (req, res) => {
    const blogData = req.body

    const userData = req.user.email

    const result = await blogServices.createBlogIntoDB(blogData, userData)
    const { _id, title, content, author } = result
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Blog created successfully',
        data: {_id, title, content, author}
    })

})
const updateBlogController = catchAsync(async (req, res) => {
    const blogData = req.body
    const userData = req.user.email
    const blogId = req.params.id

    const result = await blogServices.updateBlogFromDB(blogData, userData, blogId)
    if (!result) {
        throw new AppError(404, 'Blog not found !');
    }
    const { _id, title, content, author } = result
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Blog updated successfully',
        data:{_id, title, content, author}
    })

})


export const blogControllers = {
    createBlogController,
    updateBlogController
}