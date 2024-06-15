
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appErrors";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";





const Auth = () =>{
    return  catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    //    if the token sent from the client
      const token =  req.headers.authorization;
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')
        }

        // check if the token is valid
        jwt.verify(token,config.jwt_access_secret as string, function(err,decoded){
            if(err){
                throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')  
            }
           req.user = decoded as JwtPayload
           next()
        })
    })
}

export default Auth;