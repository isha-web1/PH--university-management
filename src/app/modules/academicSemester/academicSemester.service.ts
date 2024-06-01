
import { academicSemesterNameCodeMapper } from "./academicSemester.constance"
import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemesterIntoDb = async(payload : TAcademicSemester ) =>{

   

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('invalid semester code !')
    }
      
    const result = await AcademicSemester.create(payload)
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb
}