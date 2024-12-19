import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./auth.services";


const createUserController = catchAsync(async (req, res) => {
    const userData = req.body
    const result = await userServices.createUserIntoDB(userData)
    const {name, email, _id} = result
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: {name, email, _id}
    })

})

const loginUserController = catchAsync(async (req, res) => {
    const loginUserData = req.body
    const result = await userServices.loginUserServices(loginUserData)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: {
            token: result
        }
    })
})


export const userControllers = {
    createUserController,
    loginUserController
}