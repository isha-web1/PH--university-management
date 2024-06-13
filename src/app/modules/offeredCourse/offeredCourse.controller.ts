import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { offeredCourseServices } from "./offeredCourse.service"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"


const createOfferedCourse = catchAsync(async(req: Request, res:Response)=>{
    const result =  await offeredCourseServices.createOfferedCourseIntoDb(req.body)
    sendResponse(res,{
      statusCode : httpStatus.OK,
      success : true,
      message : 'semester registration is created',
      data : result
    })
  })

  export const OfferedCourseControllers = {
    createOfferedCourse,
    // getAllOfferedCourses,
    // getSingleOfferedCourses,
    // updateOfferedCourse,
    // deleteOfferedCourseFromDB,
  };