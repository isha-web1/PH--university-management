import { StudentModel } from "../student.model";




const getAllStudentFromDb = async() =>{
    const result = await StudentModel.find().populate('admissionSemester').populate({
        path : "academicDepartment",
        populate : {
            path : 'academicFaculty'
        }
    });
    return result;
}

const getSingleStudentFromDb = async(id : string) =>{
    const result = await StudentModel.findById({id}).populate('admissionSemester').populate({
        path : "academicDepartment",
        populate : {
            path : 'academicFaculty'
        }
    });
    return result
}
const deleteStudentFromDb = async(id : string) =>{
    const result = await StudentModel.updateOne({id},{isDeleted : true})
    return result
}

export const studentServices = {
    
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb
}