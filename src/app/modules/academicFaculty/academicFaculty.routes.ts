import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import Auth from '../../middleware/Auth.middleware';

const router = express.Router();

// will call controller function

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.CreateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get(
  '/:departmentId',
  AcademicFacultyController.getSingleAcademicFaculty,
);

router.patch(
  '/:departmentId',
  validateRequest(
    academicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

router.get('/',Auth(), AcademicFacultyController.getAllAcademicFaculty);

export const AcademicFacultyRoutes = router;
