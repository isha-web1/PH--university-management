import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



const catchAsync = (fn: RequestHandler) => {
    return (req : Request, res: Response, next : NextFunction) =>{
        Promise.resolve(fn(req, res, next)).catch(err =>next(err))
    }
}


const getAllStudentFromDb  = catchAsync(async(req, res, next) =>{
    const result = await studentServices.getAllStudentFromDb()
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student created successfully',
            data : result
         })
})
const getSingleStudentFromDb  = catchAsync(async(req, res, next) =>{
    const {studentId} = req.body
        
        const result = await studentServices.getSingleStudentFromDb(studentId)
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student are retrive successfully',
            data : result
         })
})
const deleteStudentFromDb  = catchAsync(async(req, res, next ) =>{
    const {studentId} = req.body
        
        const result = await studentServices.deleteStudentFromDb(studentId)
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student deleted successfully',
            data : result
         })
})

export const studentController = {
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb
}