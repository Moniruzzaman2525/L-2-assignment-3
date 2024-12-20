import AppError from "../../error/AppError"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { adminServices } from "./admin.services"



const userBlogController = catchAsync(async (req, res) => {
    const userId = req.params.userId

    const result = await adminServices.updateBlogFromDB(userId)
    if (!result) {
        throw new AppError(404, 'User not found !');
    }
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User blocked successfully',
    })

})


export const adminController = {
    userBlogController
}