import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import { CreateStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import Auth from '../../middleware/Auth.middleware';
import { USER_ROLE } from './user.constance';

const router = express.Router();

// will call controller function

router.post(
  '/create-student',Auth(USER_ROLE.admin),
  validateRequest(CreateStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',Auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',/* Auth(USER_ROLE.admin), */
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const UserRoutes = router;
