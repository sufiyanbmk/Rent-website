import { AdminRepositoryDbReturnMongoDB } from '../../frameworks/database/mongoDb/repositories/adminRepository'
import { CreateCatagoryInterface } from '../../types/catagoryInterface'

export const adminDbRepository = (repository:AdminRepositoryDbReturnMongoDB ) => {
  
  const getAdminByEmail = async(email:string) => await repository.getAdminByEmail(email)

  //users
  const getAllUsers = async() => await repository.getAllUsers()

  const getUserByEmail = async(email: string) => await repository.getByEmail(email)

  const updateDb = async (filter: object, update: object ) => await repository.updateOne(filter, update)

  //catagory
  const getAllCatagory = async() => await repository.getAllCatagory()

  const findCatagory = async ( catagory:string ) => await repository.findCatagory(catagory)

  const addNewCatagory = async ( catagory: CreateCatagoryInterface ) => await repository.addNewCatagory(catagory)

  return{
     getAdminByEmail,
     getAllUsers, 
     getUserByEmail,
     updateDb,
     getAllCatagory,
     findCatagory,
     addNewCatagory
    }
}

export type AdminDbInterface = typeof adminDbRepository