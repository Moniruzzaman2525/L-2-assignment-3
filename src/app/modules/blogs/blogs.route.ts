import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { blogValidation } from './blogs.validation'
import { blogControllers } from './blogs.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../auth/auth.constant'

const router = express.Router()

router.post('/', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(blogValidation.createBlogValidationSchema),  blogControllers.createBlogController)
router.patch('/:id', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(blogValidation.updateBlogValidationSchema),  blogControllers.updateBlogController)
router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), blogControllers.deleteBlogController)
router.get('/', blogControllers.getBlogsController)


export const BlogRoute = router