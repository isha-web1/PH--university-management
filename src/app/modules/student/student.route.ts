import  express  from "express";
import { studentController } from "./student.controller";

const router = express.Router()

// will call controller function

router.post('/create-student', studentController.createStudent)

router.get('/', studentController.getAllStudentFromDb)

router.get('/:studentId', studentController.getSingleStudentFromDb)

export const studentRoutes = router;