import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constance';
import { TCourse, TCourseFaculties } from './course.interface';
import { Course, courseFaculty } from './course.model';
import AppError from '../../errors/appErrors';
import httpStatus from 'http-status';


const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDb = async (id : string,payload :Partial<TCourse>)=>{

     const {preRequisiteCourses, ...courseRemainingData} = payload;
     const session = await mongoose.startSession()
      try{

     session.startTransaction()
     // step-1 : basic course info update

     const updateBasicCourseInfo = await Course.findByIdAndUpdate(id,courseRemainingData,{new : true, runValidators : true,session})

     if(!updateBasicCourseInfo){
      throw new AppError(httpStatus.BAD_REQUEST,'failed to update course')
     }

    //  check if there is any prerequisite course to update
    if(preRequisiteCourses && preRequisiteCourses.length > 0){
      // filter out the deleted field
      const deletedPreRequisites = preRequisiteCourses?.filter(el => el.course && el.isDeleted).map(el => el.course)

      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(id,
        {$pull :{preRequisiteCourses : {course : {$in : deletedPreRequisites}, }}},{new : true,runValidators:true,session}
      )

      if(!deletedPreRequisitesCourses){
        throw new AppError(httpStatus.BAD_REQUEST,'failed to update preRequisite course')
      }
      // filter out the new course field
    const newPreRequisite =  preRequisiteCourses?.filter(el => el.course && !el.isDeleted)

    const newPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet : {preRequisiteCourses : {$each : newPreRequisite}}
      },
      {new : true,runValidators:true,session}
    )

    if(!newPreRequisiteCourses){
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update new preRequisite courses')
    }
    
    const result = await Course.findById(id).populate('preRequisiteCourses.course')

     return result;
    }
    await session.commitTransaction();
    await session.endSession()
  }catch(err :any){
    await session.abortTransaction();
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST,'failed to update preRequisite course')
  }

    


}

const deletedCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultyWithCourseIntoDb = async (id : string, payload : Partial<TCourseFaculties>) =>{

  const result = await courseFaculty.findByIdAndUpdate(
    id,
    {
      course : id,
      $addToSet : {faculties : {$each : payload}}
    },
    {
      upsert : true,
      new : true
    }
  )

  return result;
}

export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deletedCourseFromDb,
  assignFacultyWithCourseIntoDb
};
