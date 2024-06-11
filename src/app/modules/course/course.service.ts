import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constance';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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
     // step-1 : basic course info update

     const updateBasicCourseInfo = await Course.findByIdAndUpdate(id,courseRemainingData,{new : true, runValidators : true})

    //  check if there is any prerequisite course to update
    if(preRequisiteCourses && preRequisiteCourses.length > 0){
      // filter out the deleted field
      const deletedPreRequisites = preRequisiteCourses?.filter(el => el.course && el.isDeleted).map(el => el.course)

      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(id,
        {$pull :{preRequisiteCourses : {course : {$in : deletedPreRequisites}}}}
      )
      // filter out the new course field
    const newPreRequisite =  preRequisiteCourses?.filter(el => el.course && !el.isDeleted)

    const newPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet : {preRequisiteCourses : {$each : newPreRequisite}}
      }
    )
    }

    
    const result = await Course.findById(id).populate('preRequisiteCourses.course')

     return result;


}

const deletedCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deletedCourseFromDb,
};
