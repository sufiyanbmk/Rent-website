import { AdminDbInterface } from "../../repositories/adminDbRepsitory";
import { CreateCatagoryInterface, CatagoryInterface} from "../../../types/catagoryInterface";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
// import Catagory from "../../../frameworks/database/mongoDb/models/catagoryModel";

export const getCatagories =async (
  dbRepositoryCatagory: ReturnType<AdminDbInterface>
) => await dbRepositoryCatagory.getAllCatagory()

export const catagoryAdd = async(
  catagory: CreateCatagoryInterface,
  dbRepositoryCatagory: ReturnType<AdminDbInterface>
) => {
  const findCatagory:CatagoryInterface | null = await dbRepositoryCatagory.findCatagory(catagory.title)
  if(findCatagory){
    throw new AppError('already Exist', HttpStatus.CONFLICT)
  }
  await dbRepositoryCatagory.addNewCatagory(catagory)
}