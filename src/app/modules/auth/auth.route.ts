import express from 'express'
import { userValidation } from './auth.validation'
import validateRequest from '../../middleware/validateRequest'
import { userControllers } from './auth.controller'

const router = express.Router()

// auth user routes
router.post('/register', validateRequest(userValidation.userValidationSchema), userControllers.createUserController)
router.post('/login', validateRequest(userValidation.userValidationLoginSchema), userControllers.loginUserController)
router.post('/refresh-token', validateRequest(userValidation.refreshTokenValidationSchema), userControllers.refreshToken)


export const UserRoute = router