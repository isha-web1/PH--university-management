import httpStatus from "http-status"
import AppError from "../../errors/appErrors"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { semesterRegistration } from "./semesterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder"

const createSemesterRegistrationIntoDb = async (payload : TSemesterRegistration) =>{
      const academicSemester = payload?.academicSemester
    //   check if there any semester registered that is already 'UPCOMING' or 'ONGOING'
    const isThereUpcomingOrOngoingSemester = await semesterRegistration.findOne({
        $or : [
            {status : 'UPCOMING'},
            {status : 'ONGOING'}
        ]
    })

    if(isThereUpcomingOrOngoingSemester){
        throw new AppError(httpStatus.NOT_FOUND,`there is already a ${isThereUpcomingOrOngoingSemester.status} semester`)
    }
      // check if the semester is exist
      const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)
      console.log(isAcademicSemesterExist)
      if(!isAcademicSemesterExist){
        
    }
    // check if the semester is already exist
      const isSemesterRegistrationExist = await semesterRegistration.findOne({academicSemester})
      if(isSemesterRegistrationExist){
        throw new AppError(httpStatus.CONFLICT,'this  semester is already registered!')
      }
      
const result = await semesterRegistration.create(payload)
return result;
}

const getAllSemesterRegistrationFromDb = async (query : Record<string,unknown>) =>{
const semesterRegistrationQuery = new QueryBuilder(semesterRegistration.find().populate('academicSemester'),query).filter().sort().paginate().fields()

const result = await semesterRegistrationQuery.modelQuery;
return result;
}

const getSingleSemesterRegistrationFromDb = async (id:string) =>{
  
    const result = await semesterRegistration.findById(id)

    return result;
}

const updateSemesterRegistrationIntoDb = async (id:string, payload:Partial<TSemesterRegistration>) =>{
//   check if the requested registered semester is exist
const isSemesterRegistrationExist = await semesterRegistration.findById(id)
if(!isSemesterRegistrationExist){
  throw new AppError(httpStatus.NOT_FOUND,'this  semester is not found!')
}
    // if the requested semester Registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExist.status;
  if(currentSemesterStatus === 'ENDED'){
    throw new AppError(httpStatus.NOT_FOUND,`this semester is already  ${currentSemesterStatus} `)
  }
}

export const semesterRegistrationService = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDb

}

