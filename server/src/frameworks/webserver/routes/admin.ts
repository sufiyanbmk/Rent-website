import express from "express";
import adminController from "../../../adapters/controllers/adminController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";



const adminRoute = () => {
  const router = express.Router();

  const controller = adminController(
    userRepositoryMongoDB
  );

  router.get("/users", controller.getAllUsers);
  router.put("/block-user", controller.blockUser);
  router.get("/reported-post", controller.getReportedPost);

  return router;
};
export default adminRoute;
