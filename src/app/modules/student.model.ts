import { Schema, model } from "mongoose";
import { Guardian, Student, UserName, localGuardian } from "./student/student.interface";







const UserNameSchema = new Schema<UserName>(
    {
        firstName : {
            type : String,
            required : [true, 'first name must be required']
        },
        middleName : {
            type : String,
            
        },
        lastName : {
            type : String,
            required : [true, 'last name must be required']
        }
    }
)

const GuardianNameSchema = new Schema<Guardian>( {
    fatherName : {
        type : String,
        required : [true, 'father name must be required']
    },
    fatherOccupation : {
        type : String,
        required : [true, 'father occupation must be required']
    },
    fatherContactNo : {
        type : String,
        required : [true, 'father contactNo must be required']
    },
    motherName : {
        type : String,
        required : [true, 'Mother name must be required']
    },
    motherOccupation : {
        type : String,
        required : [true, 'Mother occupation must be required']
    },
    motherContactNo : {
        type : String,
        required : [true, 'Mother contactNo must be required']
    },
})

const LocalGuardianNameSchema = new Schema<localGuardian>({
    name : {type : String, required : [true, 'local guardian name must be required']},
    occupation : {type : String, required : [true, 'local guardian occupation must be required']},
    contactNo : {type : String, required : [true, 'local guardian contactNo must be required']},
    address : {type : String, required : [true, 'local guardian address must be required']}
})


const StudentSchema = new Schema<Student>({
    id : {type : String, required : true, unique : true},
    // password : {type : string, required : true},
    user : {
      type :   Schema.Types.ObjectId,
      required : [true, 'user id must be provided'],
      unique : true,
      ref : 'User'
    },
    
    name : {
        type : UserNameSchema,
        required : [true, ' name must be required'],
        maxLength : [20, 'name cannot be more than 20 characters']
    } ,
    gender : {
        type : String,
        enum : {
            values : ['female', 'male'],
            message : 'the gender field one of the chose'
        },
        required : [true, 'gender must be following choose by one']
    },
    dateOfBirth : {type: String},
    email : {type: String, required : [true, 'email must be required'], unique : true},
    contactNo : {type: String, required : [true, 'contactNo must be required']},
    emergencyContactNo : {type: String, required : [true, 'emergency contactNo must be required']},
    bloodGroup : {
        type : String,
        enum: {
            values: ["A+" , "A-" , "B+" , "B-" , "AB" , "O+" , "O-"],
            message : '{VALUE} is not valid'
        }
    },
    presentAddress :  {type: String, required : [true, 'present address must be required']},
    permanentAddress : {type: String, required :[true, 'permanent address must be required']},
    guardian : {
        type : GuardianNameSchema,
        required : [true, 'guardian must be required']
    },
    localGuardian : {
        type : LocalGuardianNameSchema ,
        required : [true, 'localGuardian must be required']
    },
    profileImg : {type : String},
    admissionSemester : {
        type : Schema.Types.ObjectId,
        ref : 'AcademicSemester'
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    academicDepartment : {
        type : Schema.Types.ObjectId,
        ref : 'AcademicDepartment'
    }

})


// query middleware
StudentSchema.pre('find',function(next){
    this.find({isDeleted : {$ne:true}})
  next()
})

 export const StudentModel = model<Student>('Student', StudentSchema)