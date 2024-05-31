import { NextFunction, Request, RequestHandler, Response } from "express"
import { userService } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"

const createStudent  = catchAsync(async(req, res , next) =>{
     
    const {password,student: studentData} = req.body
    // data validation using zod
    // const zodParseData = StudentValidationSchema.parse(studentData)
    // will call service function to send this data
     const result = await userService.createStudentIntoDb(password,studentData)
    //  send response
    
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'student created successfully',
    data : result
 })
})

export const userController = {
    createStudent
}