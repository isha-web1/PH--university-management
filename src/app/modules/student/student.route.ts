import  express  from "express";
import { studentController } from "./student.controller";

const router = express.Router()

// will call controller function

router.post('/create-student', studentController.createStudent)

router.get('/', studentController.getAllStudentFromDb)

router.get('/:studentId', studentController.getSingleStudentFromDb)

router.delete('/:studentId', studentController.deleteStudentFromDb)

export const studentRoutes = router;