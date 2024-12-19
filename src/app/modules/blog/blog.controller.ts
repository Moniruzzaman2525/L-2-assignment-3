import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { blogServices } from "./blog.services"


const createBlogController = catchAsync(async (req, res) => {
    const blogData = req.body
    const result = await blogServices.createBlogIntoDB(blogData)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Blog created successfully',
        data: result
    })

})


export const blogControllers = {
    createBlogController
}