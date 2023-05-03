import { PostRepositoryInterface } from "../../application/repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../application/repositories/userRepositoryInterface";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { PostRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository";
import { UserRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { Request, Response } from "express";
import { AuthService } from "../../framework/services/authServices";
import {
  Adminlogin,
  blockUnblock,
  getAllUser,
  getDashboards,
  reportedPosts,
  singlePost,
} from "../../application/use_cases/admin/admin";
import { paginateUser } from "../../application/use_cases/admin/paginate";
import User from "../../framework/database/mongoDb/models/userModels";
import { S3service } from "../../framework/services/s3Service";
import { S3serviceInterface } from "../../application/services/s3serviceInterface";

const adminController = (
  useRepositoryImpl: UserRepositoryMongoDB,

) => {
  const userRepo = userDbrepository(useRepositoryImpl());
  const postRepo = postRepository(postRepositortyImpl());
  const authServices = authService(authServiceImpl());
  const s3Services = s3Service(s3ServiceImpl());


  const getAllUsers = (req: Request, res: Response) => {
    const { page } = req.query;
    paginateUser(User, page as string).then((data) => {
      let users = data?.results.map((e: any) => {
        return {
          id: e["_id"],
          name: e["username"],
          email: e["email"],
          status: e["blocked"],
          verified: e["verified"],
        };
      });
      data.results = users;
      res.json(data);
    });
  };

  const blockUser = (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;
    blockUnblock(email, userRepo).then(() => {
      res.sendStatus(200);
    });
  };

  const getReportedPost = (req: Request, res: Response) => {
    reportedPosts(postRepo).then((post) => {
      res.json(post);
    });
  };

  return {
    getAllUsers,
    blockUser,
    getReportedPost,
  };
};

export default adminController;
