import { Request, Response } from "express"
import { userService } from "./user.service"

const createStudent = async(req: Request, res : Response) =>{
    try{
         
        const {password,student: studentData} = req.body
        // data validation using zod
        // const zodParseData = StudentValidationSchema.parse(studentData)
        // will call service function to send this data
         const result = await userService.createStudentIntoDb(password,studentData)
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

export const userController = {
    createStudent
}