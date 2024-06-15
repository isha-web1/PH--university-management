import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";


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
     return {}
    // access granted : send AccessToken, refreshToken

}

export const AuthService = {
    loginUser
}