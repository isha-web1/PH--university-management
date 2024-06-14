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
      message : 'offered course is successfully  created',
      data : result
    })
  })

  const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const result = await offeredCourseServices.updateOfferedCourseIntoDb(
      id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse updated successfully',
      data: result,
    });
  });

  export const OfferedCourseControllers = {
    createOfferedCourse,
    // getAllOfferedCourses,
    // getSingleOfferedCourses,
    updateOfferedCourse,
    // deleteOfferedCourseFromDB,
  };