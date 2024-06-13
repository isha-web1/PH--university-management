import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { CourseRoutes } from "../modules/course/course.routes";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRagistration.routes";

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
        path: '/faculties',
        route: FacultyRoutes,
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path : '/academic-semesters',
        route : AcademicSemesterRoutes
    },
    {
        path : '/academic-faculties',
        route : AcademicFacultyRoutes
    },
    {
        path : '/academic-departments',
        route : AcademicDepartmentRoutes
    },
    {
        path : '/courses',
        route : CourseRoutes
    },
    {
        path : '/semester-registrations',
        route : semesterRegistrationRoutes
    },
]

moduleRouts.forEach(route => router.use(route.path, route.route))

export default router;

