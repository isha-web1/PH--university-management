import { NextFunction, Request, RequestHandler, Response } from "express"

import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { AcademicFacultyServices } from "./academicDepartment.service"



const createAcademicDepartment  = catchAsync(async(req, res , next) =>{
     
   const result = await AcademicFacultyServices.createAcademicDepartmentIntoDb(req.body)
    
    //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Department is created successfully',
    data : result
 })
})

const getAllAcademicDepartment = catchAsync(async(req, res)=>{
    const result = await AcademicFacultyServices.getAllAcademicDepartmentFromDb();
      //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Department are retrieved  successfully',
    data : result
 })
})

const getSingleAcademicDepartment = catchAsync(async(req, res) =>{
    const {facultyId} = req.params
    const result = await AcademicFacultyServices.getSingleAcademicDepartmentFromDb(facultyId)
         //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Faculty is retrieved  successfully',
    data : result
 })
})

const updateAcademicDepartment = catchAsync(async(req, res) =>{
    const {facultyId} = req.params;
    const result = await AcademicFacultyServices.updateAcademicDepartmentIntoDb(facultyId, req.body)
           //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'academic Faculty is updated  successfully',
    data : result
 })
})

export const AcademicDepartmentController = {
      createAcademicDepartment,
      getAllAcademicDepartment,
      getSingleAcademicDepartment,
      updateAcademicDepartment
}