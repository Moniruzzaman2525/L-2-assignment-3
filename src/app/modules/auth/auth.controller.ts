import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./auth.services";


const createUserController = catchAsync(async (req, res) => {
    const userData = req.body
    const result = await userServices.createUserIntoDB(userData)
    const { name, email, _id } = result
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: { _id, name, email }
    })

})

const loginUserController = catchAsync(async (req, res) => {
    const loginUserData = req.body
    const result = await userServices.loginUserServices(loginUserData)

    const { refreshToken } = result

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })

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