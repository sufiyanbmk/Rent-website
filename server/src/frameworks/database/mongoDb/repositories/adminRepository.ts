import AdminInterface from "../../../../types/adminInterface"
import Admin from "../models/adminModel"

export const adminRepository = () => {
  const getAdminByEmail = async(email:string) => {
    const admin:AdminInterface | null= await Admin.findOne({email})
    return admin
  }
  return {
    getAdminByEmail
  }
}

export type AdminRepository = typeof adminRepository;

export type AdminRepositoryDbReturn = ReturnType<AdminRepository>