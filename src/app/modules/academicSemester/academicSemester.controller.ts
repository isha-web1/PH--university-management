import { NextFunction, Request, RequestHandler, Response } from "express"

import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { AcademicSemesterServices } from "./academicSemester.service"

const createAcademicSemester  = catchAsync(async(req, res , next) =>{
     
   const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body)
    
    //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic semester is created successfully',
    data : result
 })
})

const getAllAcademicSemesters = catchAsync(async (req, res) => {
   const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
 
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic semesters are retrieved successfully',
     data: result,
   });
 });

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters
}