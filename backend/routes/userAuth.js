import express from "express";
import { login, register, forgotPassword, resetPassword, verifyEmail, otpLogin, otpVerify } from "../controllers/authController.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:id/:token', resetPassword)
router.post('/verify-email',verifyEmail)
router.post('/otp-login', otpLogin)
router.post('/verify-otp', otpVerify)

export default router;