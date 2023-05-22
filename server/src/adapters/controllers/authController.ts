import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import adminLogin from '../../application/useCases/auth/adminAuth'
import { AdminDbInterface } from '../../application/repositories/adminDbRepsitory'
import { AdminRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/adminRepository'
import { AuthServiceInterface } from '../../application/services/authServiceInterface'
import { AuthService } from '../../frameworks/services/authService'
import { userLogin, userRegister } from '../../application/useCases/auth/userAuth'
import { UserDbInterface } from '../../application/repositories/userDbRepository'
import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepository'
import { S3serviceInterface } from '../../application/services/s3ServiceInterface'
import { S3ServiceImpl } from '../../frameworks/services/s3Service'

const authController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDB,
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl : UserRepositoryMongoDB,
  s3ServiceInterface: S3serviceInterface,
  s3ServiceImpl: S3ServiceImpl,
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl())
  const authService = authServiceInterface(authServiceImpl())
  const s3Service = s3ServiceInterface(s3ServiceImpl())

  const loginAdmin = asyncHandler(async(req: Request, res:Response) => {
    const {email, password } : {email: string, password: string } = req.body
    const token = await adminLogin(email, password, dbRepositoryAdmin, authService)
    res.json({
      status: "success",
      message: "admin verified",
      token
    })
  })

  const registerUser = asyncHandler(async(req:Request,res:Response)=>{
    const user:{userName:string,email:string,phone:number,password:string} = req.body
    const token = await userRegister(user,dbRepositoryUser,authService)
    res.json({
        status:"success",
        message:"new user registered",
        token
    })
})

const loginUser = asyncHandler(async(req:Request,res:Response)=>{
  const {email,password}:{email:string,password:string} = req.body;
  const userDetails = await userLogin(email,password,dbRepositoryUser,authService,s3Service)
  res.json({
      status:"success",
      message:"user verified",
      userDetails
  })
})


  return {
    loginAdmin,
    registerUser,
    loginUser,
}
}

export default authController
