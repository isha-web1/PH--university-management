import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

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
    {
        path : '/academic-semesters',
        route : AcademicSemesterRoutes
    },
]

moduleRouts.forEach(route => router.use(route.path, route.route))

export default router;

