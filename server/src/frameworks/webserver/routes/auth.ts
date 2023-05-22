import express from "express";
import authController from "../../../adapters/controllers/authController";
import { adminDbRepository } from "../../../application/repositories/adminDbRepsitory";
import { authService } from "../../services/authService";
import {authServiceInterface} from "../../../application/services/authServiceInterface";
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import {  s3ServiceInterface } from "../../../application/services/s3ServiceInterface";
import { s3Service } from "../../services/s3Service";


const authRouter = () => {
  const router = express.Router();

  const controller = authController(
    adminDbRepository ,
    adminRepositoryMongoDB,
    authServiceInterface ,
    authService,
    userDbRepository,
    userRepositoryMongoDB,
    s3ServiceInterface,
    s3Service,
    );

  router.post('/admin-login',controller.loginAdmin)

  router.post('/register',controller.registerUser)

  router.post('/user-login',controller.loginUser)

  // router.post('/sign-in-with-google', controller.loginWithGoogle)

  // router.post('/forgot-password', controller.forgotPassword);

  return router
}

export default authRouter;