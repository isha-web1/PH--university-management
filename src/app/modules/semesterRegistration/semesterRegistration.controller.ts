import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createSemesterRegistration = catchAsync(async(req: Request, res:Response)=>{
//   const result = 
//   sendResponse(res,{
//     statusCode : httpStatus.OK,
//     success : true,
//     message : 'semester registration is created',
//     data : result
//   })
})


const getAllSemesterRegistration = catchAsync(async(req:Request, res:Response) =>{
    //   const result = 
//   sendResponse(res,{
//     statusCode : httpStatus.OK,
//     success : true,
//     message : 'semester registration is created',
//     data : result
//   })

})

const getSingleSemesterRegistration = catchAsync(async(req:Request,res:Response) =>{
    const {id} = req.params
    //   const result = 
//   sendResponse(res,{
//     statusCode : httpStatus.OK,
//     success : true,
//     message : 'semester registration is created',
//     data : result
//   })
})

const updateSemesterRegistration = catchAsync(async(req:Request, res:Response) =>{
  const {id} = req.params
  //   const result = 
//   sendResponse(res,{
//     statusCode : httpStatus.OK,
//     success : true,
//     message : 'semester registration is created',
//     data : result
//   })
})

export const semesterRegistrationController = {
    createSemesterRegistration,
    updateSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration

}