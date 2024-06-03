import { z } from "zod";

const CreateAcademicFacultyValidationSchema = z.object({
    
    name : z.string({
        invalid_type_error : 'Academic faculty must be string'}),
   
})
const UpdateAcademicFacultyValidationSchema = z.object({
    
    name : z.string({
        invalid_type_error : 'Academic faculty must be string'}),
   
})



export const academicFacultyValidation = {
    CreateAcademicFacultyValidationSchema,
    UpdateAcademicFacultyValidationSchema
}