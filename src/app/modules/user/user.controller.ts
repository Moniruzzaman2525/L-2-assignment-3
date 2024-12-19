import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


const createUser = catchAsync((req, res) => {
    const {userData} = req.body

    const result = 

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: result
    })

})