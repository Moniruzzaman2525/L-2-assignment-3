import { Router } from "express";
import { UserRoute } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blogs/blogs.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoute
    },
    {
        path: '/blogs',
        route: BlogRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router