import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async(req: Request, res : Response) =>{
    try{
        const {student: studentData} = req.body
        // will call service function to send this data
         const result = await studentServices.createStudentIntoDb(studentData)
        //  send response
        res.status(200).json({
            success : true,
            message : 'student is created successfully',
            data : result
        })

    }catch(err){
        console.log(err)
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
        console.log(err)
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
        console.log(err)
    }
}

export const studentController = {
    createStudent,
    getAllStudentFromDb,
    getSingleStudentFromDb
}