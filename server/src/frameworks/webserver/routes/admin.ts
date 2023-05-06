import express from "express";
import adminController from "../../../adapters/controllers/adminController";
import { adminDbRepository } from '../../../application/repositories/adminDbRepsitory'
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepository";



const adminRoute = () => {
  const router = express.Router();

  const controller = adminController(
    adminDbRepository,
    adminRepositoryMongoDB
  );

  router.route('/users')
  .get(controller.getAllUsers)
  .put(controller.blockUser)

  router.route('/catagory')
  .get(controller.getAllCatagory)
  .post(controller.addCatagory)

  return router;
};
export default adminRoute;
