

import exporss from 'express'
import auth from '../../middleware/auth'
import { adminController } from './admin.controller'
import { USER_ROLE } from '../auth/auth.constant'

const router = exporss.Router()

// admin routes
router.patch('/users/:userId/block', auth(USER_ROLE.admin), adminController.userBlockController)
router.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.adminBlogDeleteController)

export const AdminRoute = router