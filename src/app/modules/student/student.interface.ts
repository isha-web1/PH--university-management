import { Types } from "mongoose"


export type Guardian =  {
    fatherName : string,
    fatherOccupation : string,
    fatherContactNo : string
    motherName : string,
    motherOccupation : string,
    motherContactNo : string
}

export type localGuardian = {
    name : string,
    occupation : string,
    contactNo : string,
    address : string
}

export type UserName = {
    firstName : string,
    middleName? : string,
    lastName : string
}


export type Student = {
    id : string,
    user : Types.ObjectId
    password : string,
    name : UserName,
    gender : "male" | "female" | "other",
    dateOfBirth? : Date,
    email : string,
    contactNo : string,
    emergencyContactNo : string,
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB" | "O+" | "O-",
    presentAddress : string,
    permanentAddress : string,
    guardian : Guardian,
    localGuardian : localGuardian,
    profileImg? : string,
   
    isDeleted : boolean

}