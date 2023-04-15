import express from "express";
import multer from 'multer'
import { login, register, forgotPassword, resetPassword, verifyEmail, otpLogin, otpVerify, signInWithGoogle, verifyToLogin, profileImg, editProfile } from "../controllers/authController.js";

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/register', register)
router.post('/login', login);
router.post('/sign-in-with-google',signInWithGoogle)
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:id/:token', resetPassword)
router.post('/verify-email',verifyEmail)
router.put('/verify-registration',verifyToLogin)
router.post('/otp-login', otpLogin)
router.post('/verify-otp', otpVerify)
router.put('/uploading-profile-img/:id', upload.single('image'),profileImg)
router.patch('/edit-profile/:id',editProfile)

export default router;