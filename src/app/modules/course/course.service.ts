import { TCourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDb = async (payload :TCourse)=>{
 const result = await Course.create(payload)
 return result
}

const getAllCourseFromDb = async ()=>{
 const result = await Course.find()
 return result
}
const getSingleCourseFromDb = async (id : string)=>{
 const result = await Course.findById(id)
 return result
}
const deletedCourseFromDb = async (id : string)=>{
 const result = await Course.findByIdAndUpdate(id,{isDeleted : true},{new : true})
 return result
}

export const courseServices = {
     createCourseIntoDb,
     getAllCourseFromDb,
     getSingleCourseFromDb,
     deletedCourseFromDb
}