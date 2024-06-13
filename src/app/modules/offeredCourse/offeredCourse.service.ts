import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import {semesterRegistration} from '../semesterRegistration/semesterRegistration.model'
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.mode";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";


const createOfferedCourseIntoDb = async(payload: TOfferedCourse) =>{
    const {semesterRegistration,academicFaculty,academicDepartment,course,faculty} = payload;
//   check if the semester registration id is exist
const isSemesterRegistrationExits =
await semesterRegistration.findById(semesterRegistration);

if (!isSemesterRegistrationExits) {
throw new AppError(
  httpStatus.NOT_FOUND,
  'Semester registration not found !',
);
}

const academicSemester = isSemesterRegistrationExits.academicSemester;

const isAcademicFacultyExits =
await AcademicFaculty.findById(academicFaculty);

if (!isAcademicFacultyExits) {
throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
}

const isAcademicDepartmentExits =
await AcademicDepartment.findById(academicDepartment);

if (!isAcademicDepartmentExits) {
throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
}

const isCourseExits = await Course.findById(course);

if (!isCourseExits) {
throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
}

const isFacultyExits = await Faculty.findById(faculty);

if (!isFacultyExits) {
throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
}
    const result = await OfferedCourse.create({...payload,academicSemester })
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