import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./auth.services";


const createUserController = catchAsync(async (req, res) => {
    const userData = req.body
    const result = await userServices.createUserIntoDB(userData)

    // console.log(userData);
    // console.log(result);
    

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