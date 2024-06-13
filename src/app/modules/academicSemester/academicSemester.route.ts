import  express  from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";


const router = express.Router()

// will call controller function

router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.CreateAcademicValidationSchema) ,AcademicSemesterControllers.createAcademicSemester)

// router.get('/', studentController.getAllStudentFromDb)

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

// router.get('/:studentId', studentController.getSingleStudentFromDb)

// router.delete('/:studentId', studentController.deleteStudentFromDb)

export const AcademicSemesterRoutes = router;