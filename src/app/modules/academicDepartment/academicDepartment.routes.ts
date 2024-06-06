import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

// will call controller function

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidation.CreateAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidation.UpdateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;
