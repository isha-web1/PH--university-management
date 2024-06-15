import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema : AnyZodObject) =>{
    return  catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
       
        
        // validation
        // if everything alright --> next()
        await schema.parseAsync({
            body : req.body
        })
      return  next()

       
        next()
       
    })
}

export default validateRequest;