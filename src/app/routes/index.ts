import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";

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
    {
        path : '/academic-faculties',
        route : AcademicFacultyRoutes
    },
]

moduleRouts.forEach(route => router.use(route.path, route.route))

export default router;

