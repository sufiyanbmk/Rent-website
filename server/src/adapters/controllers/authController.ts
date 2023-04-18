import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import {  userLogin } from '../../application/useCases/auth/userAuth'


const loginUser = asyncHandler(async(req: Request, res: Response) => {
  const { email, password } : {email:string, password: string} = req.body;
  const token = await userLogin(email,password,dbRepositoryUser,authService) 
})