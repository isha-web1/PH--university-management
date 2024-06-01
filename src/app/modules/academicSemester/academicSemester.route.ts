import  express  from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";


const router = express.Router()

// will call controller function

router.post('/create-academic-semester', AcademicSemesterControllers.createAcademicSemester)

// router.get('/', studentController.getAllStudentFromDb)

// router.get('/:studentId', studentController.getSingleStudentFromDb)

// router.delete('/:studentId', studentController.deleteStudentFromDb)

export const AcademicSemesterRoutes = router;