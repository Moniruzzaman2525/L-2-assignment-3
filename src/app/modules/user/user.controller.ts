import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.services";


const createUserController = catchAsync(async (req, res) => {
    const userData = req.body

    console.log(userData);
    

    const result = await userServices.createUserIntoDB(userData)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: result
    })

})


export const userControllers = {
    createUserController
}