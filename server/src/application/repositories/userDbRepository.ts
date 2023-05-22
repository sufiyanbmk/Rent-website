import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepository"

export const userDbRepository=(repository:ReturnType<UserRepositoryMongoDB>)=>{

  const addUser = async (user:{userName:string,email:string,phone:number,password?:string})=>await repository.addUser(user)

  const getAllUsers = async() => await repository.getAllUsers()

  const getUserByEmail = async(email: string) => await repository.getByEmail(email)

  const updateDb = async (filter: object, update: object ) => await repository.updateOne(filter, update)
  
  const getUserCount = async () => await repository.getUsercount();

  const getCountOf = async (filter: object) => await repository.getCountof(filter);

  const getUserGraph = async() => await repository.getUserGraph()

  const updateImg = async(userId:string,profileImg:string) => await repository.updateImg(userId,profileImg)

  return {
    getUserByEmail,
    addUser,
    getAllUsers,
    updateDb,
    getUserCount,
    getCountOf,
    getUserGraph,
    updateImg
  }
}

export type UserDbInterface = typeof userDbRepository