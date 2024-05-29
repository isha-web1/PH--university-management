import { Request, Response } from "express";
import { studentServices } from "./student.service";

import StudentValidationSchema from "./student.validation";

const createStudent = async(req: Request, res : Response) =>{
    try{
         
        const {student: studentData} = req.body
        // data validation using zod
        const zodParseData = StudentValidationSchema.parse(studentData)
        // will call service function to send this data
         const result = await studentServices.createStudentIntoDb(zodParseData)
        //  send response
        res.status(200).json({
            success : true,
            message : 'student is created successfully',
            data : result
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : 'student can not retrieved successfully',
            error : err
        })
    }
   
}

const getAllStudentFromDb = async(req:Request, res:Response) =>{
    try{
        
        const result = await studentServices.getAllStudentFromDb()
        //  send response
        res.status(200).json({
            success : true,
            message : 'student are retrieved successfully',
            data : result
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : 'student can not  retrieved successfully',
            error : err
        })
    }
}
const getSingleStudentFromDb = async(req:Request, res:Response) =>{
    try{

        const {studentId} = req.body
        
        const result = await studentServices.getSingleStudentFromDb(studentId)
        //  send response
        res.status(200).json({
            success : true,
            message : 'student are retrieved successfully',
            data : result
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : 'student can not retrieved successfully',
            error : err
        })
    }
}

export const studentController = {
    createStudent,
    getAllStudentFromDb,
    getSingleStudentFromDb
}