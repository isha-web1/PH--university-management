
import mongoose from "mongoose"
import config from "../../../config"
import { TAcademicSemester } from "../academicSemester/academicSemester.interface"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { StudentModel } from "../student.model"
import { Student } from "../student/student.interface"
import {  TUser } from "./user.interface"
import { User } from "./user.model"
import { generatedStudentId } from "./user.utiles"
import AppError from "../../errors/appErrors"
import httpStatus from "http-status"

const createStudentIntoDb = async(password : string,payload : Student) =>{

    // create a user object
    const userData : Partial<TUser> = {}
    // if password in not given,use default password
    userData.password = password || config.default_password as string
    
    // set student role
    userData.role = 'student';

    
    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    const session = await mongoose.startSession()
   
    try{
        session.startTransaction()
        userData.id = await generatedStudentId(admissionSemester as TAcademicSemester)
    // create a user(transaction-1)
    const newUser = await User.create([userData],{session})
    // create a student
    if(newUser.length){
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
    
    }
    //    set id, _id as user
    payload.id = newUser[0].id;/* embed id */
    payload.user = newUser[0]._id;/* reference id */
    // create a user(transaction-2)
    const newStudent = await StudentModel.create([payload],{session})
    if(!newStudent.length){
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student') 
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent

    }catch(err){
     await session.abortTransaction()
     await session.endSession()
    }


    
    
      
    }

export const userService = {
    createStudentIntoDb
}