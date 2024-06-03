import { z } from "zod";

const CreateAcademicDepartmentValidationSchema = z.object({
    body : z.object({
    
        name : z.string({
            invalid_type_error : 'Academic department must be string',required_error : 'name is required'}),
        academicFaculty : z.string({
            invalid_type_error : 'Academic faculty must be string', required_error : 'faculty is required'})
    })
})
const UpdateAcademicDepartmentValidationSchema = z.object({
    body : z.object({
    
        name : z.string({
            invalid_type_error : 'Academic department must be string',required_error : 'name is required'}).optional(),
        academicFaculty : z.string({
            invalid_type_error : 'Academic faculty must be string', required_error : 'faculty is required'}).optional()
    })
})



export const academicDepartmentValidation = {
    CreateAcademicDepartmentValidationSchema,
    UpdateAcademicDepartmentValidationSchema
}