import { Request, Response } from "express";
import { studentServices } from "./student.service";





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
const deleteStudentFromDb = async(req:Request, res:Response) =>{
    try{

        const {studentId} = req.body
        
        const result = await studentServices.deleteStudentFromDb(studentId)
        //  send response
        res.status(200).json({
            success : true,
            message : 'student is deleted successfully',
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
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb
}