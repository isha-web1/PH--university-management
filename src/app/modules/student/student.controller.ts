import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";





const getAllStudentFromDb = async(req:Request, res:Response, next: NextFunction) =>{
    try{
        
        const result = await studentServices.getAllStudentFromDb()
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student created successfully',
            data : result
         })

    }catch(err){
        next(err)
    }
}
const getSingleStudentFromDb = async(req:Request, res:Response, next: NextFunction) =>{
    try{

        const {studentId} = req.body
        
        const result = await studentServices.getSingleStudentFromDb(studentId)
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student are retrive successfully',
            data : result
         })

    }catch(err){
        next(err)
    }
}
const deleteStudentFromDb = async(req:Request, res:Response, next : NextFunction) =>{
    try{

        const {studentId} = req.body
        
        const result = await studentServices.deleteStudentFromDb(studentId)
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student deleted successfully',
            data : result
         })

    }catch(err){
       next(err)
    }
}

export const studentController = {
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb
}