import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepository"

export const userDbRepository=(repository:ReturnType<UserRepositoryMongoDB>)=>{

  const getUserByEmail=async(email:string)=>await repository.getUserByEmail(email)
  
  const addUser = async (user:{userName:string,email:string,phone:number,password?:string})=>await repository.addUser(user)

  return {
    getUserByEmail,
    addUser,
  }
}

export type UserDbInterface = typeof userDbRepository