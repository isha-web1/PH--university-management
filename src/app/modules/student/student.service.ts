import mongoose from "mongoose";
import { StudentModel } from "../student.model";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { Student } from "./student.interface";




const getAllStudentFromDb = async() =>{
    const result = await StudentModel.find().populate('admissionSemester').populate({
        path : "academicDepartment",
        populate : {
            path : 'academicFaculty'
        }
    });
    return result;
}

const getSingleStudentFromDb = async(id : string) =>{
    console.log(id)
    const result = await StudentModel.findOne({id:id}).populate
    ('admissionSemester').populate({
        path : "academicDepartment",
        populate : {
            path : 'academicFaculty'
        }
    });
    console.log(result)
    return result
}

const updateStudentFromDb = async(id : string, payload : Partial<Student>) =>{
    console.log(id)
    const result = await StudentModel.findOneAndUpdate({id},payload)
    return result
}
const deleteStudentFromDb = async(id : string) =>{
    console.log(id)
    const isValidUser = await User.findOne({id});
    if(!isValidUser){
        throw new AppError(httpStatus.NOT_FOUND,"user does not exist")
    }
    // transaction and rollback
    const session = await mongoose.startSession()

    try{
        session.startTransaction()
        const deletedStudent = await StudentModel.findOneAndUpdate({id},{isDeleted : true}, {new : true, session})
        if(!deletedStudent){
           throw new AppError(httpStatus.BAD_REQUEST,'failed to delete student')
        }
        const deletedUser = await User.findOneAndUpdate({id},{isDeleted : true}, {new : true, session})
        if(!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST,'failed to delete user') 
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedStudent
    }catch(err){
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to delete student');
        console.log(err)
        
    }
    
}

export const studentServices = {
    
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb,
    updateStudentFromDb
}