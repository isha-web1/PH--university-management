import  express  from "express";

import validateRequest from "../../middleware/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";



const router = express.Router()

// will call controller function

router.post('/create-academic-faculty',validateRequest(academicFacultyValidation.CreateAcademicFacultyValidationSchema) ,AcademicFacultyController.createAcademicFaculty)

router.get('/:facultyId',AcademicFacultyController.getAllAcademicFaculty)

router.patch('/:facultyId',validateRequest( academicFacultyValidation.UpdateAcademicFacultyValidationSchema),AcademicFacultyController.updateAcademicFaculty)

router.get('/', AcademicFacultyController.getAllAcademicFaculty)

export const AcademicFacultyRoutes = router;