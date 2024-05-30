import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../../config";
import bcrypt from 'bcrypt'


const UserSchema = new Schema<TUser>({
    id : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    needsPasswordChange : {
        type : Boolean,
        default : true
    },
    role : {
        type : String,
        enum : ['student' , 'admin', 'faculty']
    },
    status : {
        type : String,
        enum : ['in-progress', 'blocked'],
        default : 'in-progress'
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
},
{
    timestamps : true
})


// pre save middleware
UserSchema.pre('save',async function(next){
    // console.log(this, 'pre hook: we will save the data')
    // hashing password and save into Db
    const user = this;
  user.password = await  bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
  next()
})
// post save middle ware
UserSchema.post('save', function(doc,next){
    doc.password = '';
    next()
})

export const User = model<TUser>('User', UserSchema)