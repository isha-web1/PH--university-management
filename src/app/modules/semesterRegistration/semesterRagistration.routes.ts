import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';


const router = express.Router();

// will call controller function

router.post(
  '/create-semester-Registration',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch('/:id', semesterRegistrationController.updateSemesterRegistration ),
 
  
 
 


router.get('/', semesterRegistrationController.getAllSemesterRegistration);


    
   
  

export const semesterRegistrationRoutes = router;
