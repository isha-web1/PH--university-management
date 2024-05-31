import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import { CreateStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

// will call controller function

router.post(
  '/create-student',
  validateRequest(CreateStudentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
