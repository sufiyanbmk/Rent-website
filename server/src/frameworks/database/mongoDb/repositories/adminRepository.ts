import AdminInterface from "../../../../types/adminInterface"
import Admin from "../models/adminModel"
import User from "../models/userModel";
import Catagory from "../models/catagoryModel";
import { CreateCatagoryInterface } from "../../../../types/catagoryInterface";

export const adminRepositoryMongoDB = () => {
  const getAdminByEmail = async(email:string) => {
    const admin:AdminInterface | null= await Admin.findOne({email})
    return admin
  }

  const getAllUsers =async () => 
    await User.find()

  const getByEmail =async (email: string) => 
    await User.findOne({ email: email})

  const updateOne = async ( filter: object, update: object) =>
    await User.updateOne( filter, update )

  const getAllCatagory = async () =>
    await Catagory.find()

  const findCatagory = async ( catagory: string ) => 
    await Catagory.findOne({ title: catagory })
  
  const addNewCatagory = async ( catagory: CreateCatagoryInterface ) =>
    await Catagory.create(catagory);

  return {
    getAdminByEmail,
    getAllUsers,
    getByEmail,
    updateOne,
    getAllCatagory,
    findCatagory,
    addNewCatagory
  }
}

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;

export type AdminRepositoryDbReturnMongoDB = ReturnType<AdminRepositoryMongoDB>