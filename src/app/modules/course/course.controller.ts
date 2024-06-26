
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"

import { courseServices } from "./course.service"


const createCourse  = catchAsync(async(req, res , next) =>{
     
   const result = await courseServices.createCourseIntoDb(req.body)
    
    //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'Course is created successfully',
    data : result
 })
})

const getAllCourses = catchAsync(async(req, res)=>{
    const result = await courseServices.getAllCourseFromDb(req.query);
      //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'course are retrieved  successfully',
    data : result
 })
})

const getSingleCourses = catchAsync(async(req, res) =>{
    const {id} = req.params
    const result = await courseServices.getSingleCourseFromDb(id)
         //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'single course is retrieved  successfully',
    data : result
 })
})

const updateCourse = catchAsync(async(req, res) =>{
    const {id} = req.params;
    const result = await courseServices.updateCourseIntoDb(id, req.body)
    console.log(result)
           //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'course is updated  successfully',
    data : result
 })
})

const deleteCourse = catchAsync(async(req, res) =>{
    const {id} = req.params
    const result = await courseServices.deletedCourseFromDb(id)
         //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : ' course is deleted  successfully',
    data : result
 })
})

const assignFacultiesWithCourse = catchAsync(async(req, res) =>{
    const {courseId} = req.params
    const {faculties} = req.body
    const result = await courseServices.assignFacultyWithCourseIntoDb(courseId,faculties)
         //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : ' faculty assign  successfully',
    data : result
 })
})

const removeFacultiesFromCourse = catchAsync(async(req, res) =>{
    const {courseId} = req.params
    const {faculties} = req.body
    const result = await courseServices.removeFacultyFromCourseFromDb(courseId,faculties)
         //  send response
 sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : ' faculty removed  successfully',
    data : result
 })
})

export const CourseController = {
     createCourse,
     getAllCourses,
     updateCourse,
     getSingleCourses,
     assignFacultiesWithCourse,
     removeFacultiesFromCourse,
     deleteCourse
}