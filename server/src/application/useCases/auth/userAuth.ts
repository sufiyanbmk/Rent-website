import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import {UserInterface, UserReturnInterface} from "../../../types/userInterface";
import { S3serviceInterface } from "../../services/s3ServiceInterface";

export const userRegister = async (
  user: {userName:string,email:string,phone:number,password:string},
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
  }
  user.password = await authService.encryptPassword(user.password);
  const { _id: userId } = await userRepository.addUser(user);
  const token = authService.generateToken(userId.toString());
  return token;
};

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>,
  s3Services: ReturnType<S3serviceInterface>
) => {
   const user:UserInterface | null | any = await userRepository.getUserByEmail(email)
   if(!user){
    throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED)
   }
   if(user.isGoogleUser){
    throw new AppError("You are logged in using Google Auth",401)
   }
   const isPasswordCorrect = await authService.comparePassword(password,user.password)
   if(!isPasswordCorrect){
    throw new AppError("Sorry, your password was incorrect. Please double-check your password", HttpStatus.UNAUTHORIZED)
   }
   const token = authService.generateToken(user._id.toString())
   if(user.profileImage){
    let url = await s3Services.getFile(user.profileImage);
    user.set("imgLink", url, { strict: false });
   }
   const userDetails : UserReturnInterface = {
    id:user._id,
    email:user.email,
    userName:user.userName,
    profileImage:user.profileImage,
    imgLink:user.imgLink,
    token:token
   }

   return userDetails;
};