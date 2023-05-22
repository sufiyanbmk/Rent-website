/* eslint-disable */
import { USER_LOGIN, LOGOUT, SIGNIN_WITH_OTP, UPDATE_PROFILE_IMG, EDITED_PROFILE } from '../constants/actionTypes.js';

export const Login = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const Logout = () => ({
  type: LOGOUT
})

export const OtpLogin = (user) => ({
  type: SIGNIN_WITH_OTP,
  payload: user
})

export const UpdateProfileimg = (image) =>({
  type: UPDATE_PROFILE_IMG,
  payload:image
})

export const EditProfileUpdate = (updatedField) =>({
  type: EDITED_PROFILE,
  payload: updatedField
})
