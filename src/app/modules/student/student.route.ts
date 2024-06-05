import  express  from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router()

// will call controller function



router.get('/', studentController.getAllStudentFromDb)

router.get('/:studentId', studentController.getSingleStudentFromDb)

router.patch('/:studentId', validateRequest(updateStudentValidationSchema),studentController.updateStudentFromDb)

router.delete('/:studentId', studentController.deleteStudentFromDb)

export const studentRoutes = router;