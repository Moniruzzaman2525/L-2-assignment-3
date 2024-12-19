import express from 'express'
import { userValidation } from './user.validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()


router.post('', validateRequest(userValidation.usserValidationSchema))


