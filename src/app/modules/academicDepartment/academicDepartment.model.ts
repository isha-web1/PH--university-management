import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";




const AcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    name : {
        type : String,
        required : true,
        unique : true
    },
    academicFaculty : {
        type : Schema.Types.ObjectId,
        ref : 'AcademicFaculty'
    }
  
},
{
    timestamps : true
})

AcademicDepartmentSchema.pre('save',async function(next){
    const isDepartmentExist = await AcademicDepartment.findOne({name : this.name})
    if(isDepartmentExist){
        throw new Error('Academy department all ready exist')
    }
    next()
})

// academic Department update validation
AcademicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery()
    const isDepartmentExist = await AcademicDepartment.findOne(query)
    if(!isDepartmentExist){
        throw new Error('This academic department does not exist')
    }
    next()
})



export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', AcademicDepartmentSchema)