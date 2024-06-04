import { Schema, model } from 'mongoose';
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constance';
import AppError from '../../errors/appErrors';
import httpStatus from 'http-status';


const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum : AcademicSemesterName
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum : AcademicSemesterCode,
    },

    startMonth: {
      type: String,
      required : true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required : true,
      enum: Months,
    },
    
   
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save', async function(next){
  const isSemesterExists = await AcademicSemester.findOne({
    year : this.year,
    name: this.name,
  })
  if(isSemesterExists){
    throw new AppError(httpStatus.NOT_FOUND,'semester is already exists !')
  }
  next()
})

 export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester',
    AcademicSemesterSchema)
