import mongoose from "mongoose";
import { StudentModel } from "../student.model";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { Student } from "./student.interface";
import { object } from "zod";
import { query } from "express";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableField } from "./student.constant";




const getAllStudentFromDb = async(query : Record<string,unknown>) =>{
    console.log('base query', query)
    // const queryObj = {...query}
    
    // let searchTerm = '';
    // if(query?.searchTerm){
    //     searchTerm = query?.searchTerm as string
    // }
    // const searchQuery = StudentModel.find({
    //     $or : studentSearchableField.map((field) =>({
    //         [field] : {$regex: searchTerm, $options : 'i'} 
    //     }))
    // })

    // filtering
    // const excludeFields = ['searchTerm', 'sort', 'limit','page', 'fields']
    // excludeFields.forEach((el) => delete queryObj[el])
    
    // const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
    //     path : "academicDepartment",
    //     populate : {
    //         path : 'academicFaculty'
    //     }
    // });


//     let sort = '-createdAt';
// if(query.sort){
//     sort = query.sort as string
// }

// const sortQuery =  filterQuery.sort(sort)
// let page =1;
// let limit = 1;
// let skip = 0;
// if(query.limit){
//     limit = Number(query.limit) 
// }
// if(query.page){
//     page = Number(query.page)
//     skip = (page-1)*limit
// }
// const paginateQuery = sortQuery.skip(skip)


// const limitQuery =  paginateQuery.limit(limit)

// // field filtering
// let fields = '-__v'
// if(query.fields){
//     fields = (query.fields as string).split(',').join(' ')
//     console.log({fields})
// }
// const fieldQuery = await limitQuery.select(fields)
//     return fieldQuery;

const studentQuery = new QueryBuilder(StudentModel.find().populate('user').populate('admissionSemester').populate({
        path : "academicDepartment",
        populate : {
            path : 'academicFaculty'
        }
    })
,query).search(studentSearchableField).filter().sort().paginate().fields()
  
const result = await studentQuery.modelQuery;
return result


}



const getSingleStudentFromDb = async(id : string) =>{
    console.log(id)
    const result = await StudentModel.findById(id).populate
    ('admissionSemester').populate({
        path : "academicDepartment",
        populate : {
            path : 'academicFaculty'
        }
    });
    console.log(result)
    return result
}

const updateStudentFromDb = async(id : string, payload : Partial<Student>) =>{
    const {name, guardian, localGuardian, ...remainingStudentData} = payload;

    const modifiedUpdateData : Record<string,unknown> = {...remainingStudentData}

    if(name && Object.keys(name).length){
        for(const [key,value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value
        } 
    }
    if(guardian && Object.keys(guardian).length){
        for(const [key,value] of Object.entries(guardian)){
            modifiedUpdateData[`guardian.${key}`] = value
        } 
    }
    if(localGuardian && Object.keys(localGuardian).length){
        for(const [key,value] of Object.entries(localGuardian)){
            modifiedUpdateData[`localGuardian.${key}`] = value
        } 
    }
    console.log(modifiedUpdateData)
    const result = await StudentModel.findByIdAndUpdate(id,modifiedUpdateData, {new : true, runValidators : true})
    return result
}
const deleteStudentFromDb = async(id : string) =>{
    console.log(id)
    const isValidUser = await User.findOne({id});
    if(!isValidUser){
        throw new AppError(httpStatus.NOT_FOUND,"user does not exist")
    }
    // transaction and rollback
    const session = await mongoose.startSession()

    try{
        session.startTransaction()
        const deletedStudent = await StudentModel.findByIdAndUpdate(id,{isDeleted : true}, {new : true, session})
        if(!deletedStudent){
           throw new AppError(httpStatus.BAD_REQUEST,'failed to delete student')
        }
        // get user id from deletedStudent
        const userId = deletedStudent.user
        const deletedUser = await User.findByIdAndUpdate(userId,{isDeleted : true}, {new : true, session})
        if(!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST,'failed to delete user') 
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedStudent
    }catch(err){
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to delete student');
       
        
    }
    
}

export const studentServices = {
    
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb,
    updateStudentFromDb
}