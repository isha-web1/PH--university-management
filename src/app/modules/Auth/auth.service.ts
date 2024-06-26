import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from "./auth.utiles";
import bcrypt from 'bcrypt'


const loginUser = async(payload : TLoginUser) =>{
    //   checking if user is exist
    const user = await User.isUserExistsByCustomId(payload.id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if user already deleted
    const isDeleted = user?.isDeleted;

   if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

    // checking if user blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
     //checking if the password is correct

     if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    
    // create token and sent to the client

    const Payload = {
        userId: user.id,
        role: user.role,
      };

     const accessToken = createToken(
        Payload,
        config.jwt_access_secret as string,
         '1d'
     )

     return {
        accessToken,
        needsPasswordChange: user?.needsPasswordChange
     }
     
}


const changePassword = async (userData :JwtPayload,payload : {oldPassword : string,newPassword : string}) => {

   //   checking if user is exist
   const user = await User.isUserExistsByCustomId(userData.userId);

   if (!user) {
     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
   }
   // checking if user already deleted
   const isDeleted = user?.isDeleted;

  if (isDeleted) {
   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
 }

   // checking if user blocked
   const userStatus = user?.status;

   if (userStatus === 'blocked') {
     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
   }
    //checking if the password is correct

    if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password)))
       throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
 
  await User.findOneAndUpdate({
    id : userData.userId,
    role : userData.role
  },{
    password : newHashedPassword,
    needsPasswordChange : false,
    passwordChangedAt : new Date()
  })
  return null;
}

export const AuthService = {
    loginUser,
    changePassword
}