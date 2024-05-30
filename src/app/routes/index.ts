import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.route";

const router = Router()

const moduleRouts = [
    {
        path : '/users',
        route : UserRoutes
    },
    {
        path : '/students',
        route : studentRoutes
    },
]

moduleRouts.forEach(route => router.use(route.path, route.route))

export default router;

