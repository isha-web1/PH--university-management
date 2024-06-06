import mongoose from "mongoose";
import { StudentModel } from "../student.model";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { Student } from "./student.interface";
import { object } from "zod";




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
    const {name, guardian, localGuardian, ...remainingStudentData} = payload;

    const modifiedUpdateData : Record<string,unknown> = {...remainingStudentData}

    if(name && Object.keys(name).length){
        for(const [key,value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value
        } 
    }
    if(guardian && Object.keys(guardian).length){
        for(const [key,value] of Object.entries(guardian)){
            modifiedUpdateData[`guardian.${key}`] = value
        } 
    }
    if(localGuardian && Object.keys(localGuardian).length){
        for(const [key,value] of Object.entries(localGuardian)){
            modifiedUpdateData[`localGuardian.${key}`] = value
        } 
    }
    console.log(modifiedUpdateData)
    const result = await StudentModel.findOneAndUpdate({id},modifiedUpdateData, {new : true, runValidators : true})
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
       
        
    }
    
}

export const studentServices = {
    
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb,
    updateStudentFromDb
}