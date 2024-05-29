import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDb = async(studentData : Student) =>{

//   const result = await StudentModel.create(student)/* build in static method */
const student = new StudentModel(studentData)
const result = await student.save()/* build in instance method(provided by mongoose) */
  return result
}

const getAllStudentFromDb = async() =>{
    const result = await StudentModel.find();
    return result;
}

const getSingleStudentFromDb = async(id : string) =>{
    const result = await StudentModel.findOne({id})
    return result
}
const deleteStudentFromDb = async(id : string) =>{
    const result = await StudentModel.updateOne({id},{isDeleted : true})
    return result
}

export const studentServices = {
    createStudentIntoDb,
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb
}