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
    console.log(result)
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'student created successfully',
    data : result
 })
})

// create faculty
const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
  
    const result = await userService.createFacultyIntoDB(password, facultyData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is created succesfully',
      data: result,
    });
  });

//   create admin

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;
  
    const result = await userService.createAdminIntoDB(password, adminData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is created succesfully',
      data: result,
    });
  });

export const userController = {
    createStudent,
    createFaculty,
    createAdmin
}