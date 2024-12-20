import config from "../../config";
import AppError from "../../error/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authUserServices } from "./auth.services";

// create user controller
const createUserController = catchAsync(async (req, res) => {
    const userData = req.body
    const result = await authUserServices.createUserIntoDB(userData)
    const { name, email, _id } = result[0]
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: { _id, name, email }
    })

})

// login user controller
const loginUserController = catchAsync(async (req, res) => {
    const loginUserData = req.body
    const result = await authUserServices.loginUserServices(loginUserData)

    const { refreshToken, accessToken } = result

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: {
            token: accessToken
        }
    })
})

// refresh token controller
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authUserServices.refreshToken(refreshToken);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Access token is retrieved succesfully!',
      data: result,
    });
  });

export const userControllers = {
    createUserController,
    loginUserController,
    refreshToken
}