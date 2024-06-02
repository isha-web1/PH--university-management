import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constance";


const CreateAcademicValidationSchema = z.object({
    body : z.object({
       name : z.enum([...AcademicSemesterName]as [string, ...string[]]).optional(),
       year : z.string().optional(),
       code : z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
       startMonth : z.enum([...Months] as [string, ...string[]]).optional(),
       endMonth :  z.enum([...Months] as [string, ...string[]]).optional()
    })
    
})



export const AcademicSemesterValidations = {
     CreateAcademicValidationSchema
}