import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getUsers, blockAndUnblockUser } from '../../application/useCases/admin/managingUser';
import { getCatagories, catagoryAdd } from '../../application/useCases/admin/managingCatagory'
import { AdminDbInterface } from "../../application/repositories/adminDbRepsitory";
import { AdminRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/adminRepository";
import { CreateCatagoryInterface } from "../../types/catagoryInterface";

const adminController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDB
) =>{

  const DbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl())

   const getAllUsers = asyncHandler(async(req: Request, res: Response) => {
    const users = await getUsers(DbRepositoryAdmin)
    res.json(users) 
   })

   const blockUser = asyncHandler(async(req:Request, res:Response) =>{
    const { email } = req.body;
    await blockAndUnblockUser(email,DbRepositoryAdmin)
    res.json({status:"success",message:"succefully updated"})
   })

   const getAllCatagory = asyncHandler(async(req:Request, res:Response) => {
    const catagory = await getCatagories(DbRepositoryAdmin)
    res.json(catagory)
   })

   const addCatagory = asyncHandler(async(req:Request, res:Response) => {
    const catagory: CreateCatagoryInterface = req.body
    await catagoryAdd(catagory,DbRepositoryAdmin)
    res.json({status:"success", message:"succefully added"})
   })
   return {
    getAllUsers,
    blockUser,
    getAllCatagory,
    addCatagory
   }
}

export default adminController;