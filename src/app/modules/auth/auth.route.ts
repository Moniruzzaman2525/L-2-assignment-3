import express from 'express'
import { userValidation } from './auth.validation'
import validateRequest from '../../middleware/validateRequest'
import { userControllers } from './auth.controller'

const router = express.Router()

router.post('/register', validateRequest(userValidation.userValidationSchema), userControllers.createUserController)

export const UserRoute = router