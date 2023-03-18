import express from "express";
import { login, register, forgotPassword } from "../controllers/authController.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', login);
router.post('/forgot-password', forgotPassword)

export default router;