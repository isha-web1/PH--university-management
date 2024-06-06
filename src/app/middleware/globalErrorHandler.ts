import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import path from "path";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../../config";


const globalErrorHandler : ErrorRequestHandler = (err, req, res, next : NextFunction)=>{
    // setting defaults values
    let statusCode = err.statusCode || 500;
    let message = err.message ||'something went wrong';

   

    let errorSources : TErrorSources = [{
       path : '',
       message : 'something went wrong !'
    }]

    const handleZodError = (err : ZodError) =>{

      const errorSources : TErrorSources = err.issues.map((issue: ZodIssue)=>{
        return {
            path : issue?.path[issue.path.length-1],
            message : issue.message
        }
      })   
      const  statusCode= 400;
      return {
        statusCode,
        message : 'validation error',
        errorSources
      }
    }

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode,
        message = simplifiedError?.message,
        errorSources =  simplifiedError?.errorSources
    }
    //  ultimate return
    return res.status(statusCode).json({
     success : false,
     message,
     errorSources,
     stack :config.NODE_ENV === 'development' ? err?.stack : null
     
    })
 
 }

 export default globalErrorHandler;