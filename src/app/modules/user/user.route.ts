import express from 'express'
import { userValidation } from './user.validation'
import validateRequest from '../../middleware/validateRequest'
import { userControllers } from './user.controller'

const router = express.Router()


router.post('/register', validateRequest(userValidation.usserValidationSchema), userControllers.createUserController)





export const UserRoute = router