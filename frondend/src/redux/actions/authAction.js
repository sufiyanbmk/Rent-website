/* eslint-disable */
import { USER_LOGIN, LOGOUT, SIGNIN_WITH_OTP } from '../constants/actionTypes.js';

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