import { AdminDbInterface } from "../../repositories/adminDbRepsitory";

export const getUsers = async(
  dbRepositoryUser: ReturnType<AdminDbInterface>
) => await dbRepositoryUser.getAllUsers()

export const blockAndUnblockUser = async(
  email: string,
  dbRepositoryUser: ReturnType<AdminDbInterface>
) => {
  const findedUser = await dbRepositoryUser.getUserByEmail(email)
  await dbRepositoryUser.updateDb({ email }, { blocked: !findedUser?.isblocked })
}