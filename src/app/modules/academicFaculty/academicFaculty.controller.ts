import { NextFunction, Request, RequestHandler, Response } from "express"

import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { AcademicFacultyServices } from "./academicFaculty.service"


const createAcademicFaculty  = catchAsync(async(req, res , next) =>{
     
   const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body)
    
    //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Faculty is created successfully',
    data : result
 })
})

const getAllAcademicFaculty = catchAsync(async(req, res)=>{
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();
      //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Faculty are retrieved  successfully',
    data : result
 })
})

const getSingleAcademicFaculty = catchAsync(async(req, res) =>{
    const {facultyId} = req.params
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId)
         //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Faculty is retrieved  successfully',
    data : result
 })
})

const updateAcademicFaculty = catchAsync(async(req, res) =>{
    const {facultyId} = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(facultyId, req.body)
           //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Faculty is updated  successfully',
    data : result
 })
})

export const AcademicFacultyController = {
     createAcademicFaculty,
     getAllAcademicFaculty,
     getSingleAcademicFaculty,
     updateAcademicFaculty
}