import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import path from "path";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/appErrors";


const globalErrorHandler : ErrorRequestHandler = (err, req, res, next : NextFunction)=>{
    // setting defaults values
    let statusCode = 500;
    let message = 'something went wrong';

   

    let errorSources : TErrorSources = [{
       path : '',
       message : 'something went wrong !'
    }]

    

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode,
        message = simplifiedError?.message,
        errorSources =  simplifiedError?.errorSources
    }else if(err?.name === 'ValidationError'){
       const simplifiedError = handleValidationError(err)
       statusCode = simplifiedError?.statusCode,
       message = simplifiedError?.message,
       errorSources = simplifiedError?.errorSources
    }else if(err?.name === 'castError'){
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError?.statusCode,
        message = simplifiedError?.message,
        errorSources = simplifiedError?.errorSources  
    }else if(err?.name === 11000){
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError?.statusCode,
        message = simplifiedError?.message,
        errorSources = simplifiedError?.errorSources  
    }else if(err instanceof AppError){
        
        statusCode = err.statusCode,
        message = err.message,
        errorSources = [{
            path : '',
            message : err.message
        }]  
    }else if(err instanceof Error){
        
        message = err.message,
        errorSources = [{
            path : '',
            message : err.message
        }]  
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