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

router.patch(
  '/:id',
  validateRequest(
    courseValidationSchema.updateCourseValidationSchema,
  ),
  CourseController.updateCourse,
);

router.put('/:courseId/assign-faculties',validateRequest(courseValidationSchema.facultiesWithCourseValidationSchema),CourseController.assignFacultiesWithCourse)

router.delete('/:courseId/remove-faculties',validateRequest(courseValidationSchema.facultiesWithCourseValidationSchema),CourseController.removeFacultiesFromCourse)

router.get('/', CourseController.getAllCourses);

router.delete('/:id', CourseController.deleteCourse);
    
   
  

export const CourseRoutes = router;
