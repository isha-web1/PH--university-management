import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";


const createOfferedCourseIntoDb = async(payload: TOfferedCourse) =>{
  
    const result = await OfferedCourse.create(payload)
    return result;
}


const getAllOfferedCourseFromDB = async(query:Record<string,unknown>) =>{


}


const getSingleOfferedCourseFromDb = async(id:string) =>{

}


const updateOfferedCourseIntoDb = async(id:string, payload:Partial<TOfferedCourse>) =>{


}

export const offeredCourseServices = {
    createOfferedCourseIntoDb,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDb,
    updateOfferedCourseIntoDb
}