import express from "express";
import authController from "../../../adapters/controllers/authController";
import { adminDbRepository } from "../../../application/repositories/adminDbRepsitory";
import { authService } from "../../services/authService";
import {authServiceInterface} from "../../../application/services/authServiceInterface";
import { adminRepository } from "../../database/mongoDb/repositories/adminRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";


const authRoute = () => {
  const router = express.Router();

  const controller = authController(
    adminDbRepository ,
    adminRepository,
    authServiceInterface ,
    authService,
    userDbRepository,
    userRepositoryMongoDB,
    );

  router.post('/admin-login',controller.loginAdmin)

  router.post('/register',controller.registerUser)

  router.post('/user-login',controller.loginUser)
}

export default authRoute;