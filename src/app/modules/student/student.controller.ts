import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";






const getAllStudentFromDb  = catchAsync(async(req, res, next) =>{
    const result = await studentServices.getAllStudentFromDb(req.query)
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student created successfully',
            data : result
         })
})
const getSingleStudentFromDb  = catchAsync(async(req, res, next) =>{
    const {id} = req.params
        console.log(req.params)
        const result = await studentServices.getSingleStudentFromDb(id)
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'student are retrieve successfully',
            data : result
         })
})

const updateStudentFromDb  = catchAsync(async(req, res, next ) =>{
    const {id} = req.params
    const {student} = req.body    
        const result = await studentServices.updateStudentFromDb(id,student)
        //  send response
        sendResponse(res,{
            statusCode : httpStatus.OK,
            success : true,
            message : 'update student successfully',
            data : result
         })
})
const deleteStudentFromDb  = catchAsync(async(req, res, next ) =>{
    const {id} = req.params
        
        const result = await studentServices.deleteStudentFromDb(id)
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
     updateStudentFromDb,
     deleteStudentFromDb
}