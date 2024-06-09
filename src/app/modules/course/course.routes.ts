import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { courseValidationSchema } from './course.validation';
import { CourseController } from './course.controller';


const router = express.Router();

// will call controller function

router.post(
  '/create-course',
  validateRequest(
    courseValidationSchema.createCourseValidationSchema,
  ),
  CourseController.createCourse,
);

router.get(
  '/:id',
  CourseController.getSingleCourses,
);

// router.patch(
//   '/:departmentId',
//   validateRequest(
//     academicFacultyValidation.UpdateAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyController.updateAcademicFaculty,
// );

router.get('/', CourseController.getAllCourses);

router.delete('/:id', CourseController.deleteCourse);
    
   
  

export const CourseRoutes = router;
