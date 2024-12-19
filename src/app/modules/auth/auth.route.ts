import express from 'express'
import { userValidation } from './auth.validation'
import validateRequest from '../../middleware/validateRequest'
import { userControllers } from './auth.controller'

const router = express.Router()

router.post('/register', validateRequest(userValidation.userValidationSchema), userControllers.createUserController)
router.post('/login', validateRequest(userValidation.userValidationLoginSchema), userControllers.loginUserController)


export const UserRoute = router