
import mongoose from "mongoose"
import config from "../../../config"
import { TAcademicSemester } from "../academicSemester/academicSemester.interface"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { StudentModel } from "../student.model"
import { Student } from "../student/student.interface"
import {  TUser } from "./user.interface"
import { User } from "./user.model"
import { generateAdminId, generateFacultyId, generatedStudentId } from "./user.utiles"
import AppError from "../../errors/appErrors"
import httpStatus from "http-status"
import { TFaculty } from "../faculty/faculty.interface"
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model"
import { Faculty } from "../faculty/faculty.model"
import { Admin } from "../admin/admin.model"

const createStudentIntoDb = async(password : string,payload : Student) =>{

    // create a user object
    const userData : Partial<TUser> = {}
    // if password in not given,use default password
    userData.password = password || config.default_password as string
    
    // set student role
    userData.role = 'student';

    
    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
    // const isValidUser = await User.findOne();
    // if(!isValidUser){
    //     throw new AppError(httpStatus.NOT_FOUND,"user does not exist")
    // }
    const session = await mongoose.startSession()
   
    try{
        session.startTransaction()
        userData.id = await generatedStudentId(admissionSemester as TAcademicSemester)
    // create a user(transaction-1)
    const newUser = await User.create([userData],{session})
    // create a student
    if(!newUser.length){
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
    console.log(newStudent,newUser, 'user')

    return newStudent
    

    }catch(err : any){
     await session.abortTransaction()
     await session.endSession()
     throw new Error(err)
    }

          
    }

    // create faculty service
    
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);
  
    //set student role
    userData.role = 'faculty';
  
    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
      payload.academicDepartment,
    );
  
    if (!academicDepartment) {
      throw new AppError(400, 'Academic department not found');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateFacultyId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); // array
  
      //create a faculty
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a faculty (transaction-2)
  
      const newFaculty = await Faculty.create([payload], { session });
  
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newFaculty;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

//   create admin 
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);
  
    //set student role
    userData.role = 'admin';
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); 
  
      //create a admin
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await Admin.create([payload], { session });
  
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newAdmin;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };
  

export const userService = {
    createStudentIntoDb,
    createFacultyIntoDB,
    createAdminIntoDB
}