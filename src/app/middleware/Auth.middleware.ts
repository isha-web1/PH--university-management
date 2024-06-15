
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appErrors";
import httpStatus from "http-status";

const Auth = () =>{
    return  catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
       
      const token =  req.headers.authorization;
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')
        }
       next()
    })
}

export default Auth;