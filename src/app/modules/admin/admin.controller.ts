import AppError from "../../error/AppError"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { adminServices } from "./admin.services"

// user block controller
const userBlockController = catchAsync(async (req, res) => {
    const userId = req.params.userId

    const result = await adminServices.adminBlockUserFromDB(userId)
    if (!result) {
        throw new AppError(404, 'User not found !');
    }
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User blocked successfully',
    })

})


// blog delete controller
const adminBlogDeleteController = catchAsync(async (req, res) => {
    const blogId = req.params.id
    await adminServices.adminBlogDeleteFromDB(blogId)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Blog deleted successfully',
    })

})

export const adminController = {
    userBlockController,
    adminBlogDeleteController
}