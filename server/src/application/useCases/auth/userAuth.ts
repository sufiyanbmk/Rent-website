
import { UserDbInterface } from "../../repositories/userDbRepository";

export const userLogin =async (
  email : string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
  ) => {
  
}