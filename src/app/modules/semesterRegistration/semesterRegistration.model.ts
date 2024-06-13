import mongoose, { Schema,  } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistration.constance";
import { timeStamp } from "console";

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  academicSemester : {
    type : Schema.Types.ObjectId,
    unique : true,
    required : true,
    ref : 'AcademicSemester'
  },
  status : {
    type : String,
    enum : semesterRegistrationStatus,
    default : 'UPCOMING'
  },
  startDate : {
    type : Date,
    required : true
  },
  endDate : {
    type : Date,
    required : true
  },
  minCredit : {
    type : Number,
    default : 3
  },
  maxCredit : {
    type : Number,
    default : 15
  }
},
{
    timestamps : true
})

export const semesterRegistration = mongoose.model<TSemesterRegistration>('semesterRegistration', semesterRegistrationSchema)