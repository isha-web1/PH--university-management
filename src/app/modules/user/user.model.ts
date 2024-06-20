import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../../config";
import bcrypt from 'bcrypt'


const UserSchema = new Schema<TUser, UserModel>({
    id : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : 0
    },
    needsPasswordChange : {
        type : Boolean,
        default : true
    },
    passwordChangedAt : {
         type : Date
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

// set '' after saving password
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

  UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password');
  };
  
  UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
  

export const User = model<TUser,UserModel>('User', UserSchema)