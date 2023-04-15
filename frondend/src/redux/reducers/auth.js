/* eslint-disable */
import { USER_LOGIN, LOGOUT, SIGNIN_WITH_OTP, UPDATE_PROFILE_IMG, EDITED_PROFILE } from '../constants/actionTypes.js';

const authReducer = (state = {authData:null},{type,payload}) => {
  switch ( type ){
    case USER_LOGIN:
      localStorage.setItem('profile',JSON.stringify({ ...payload}))
      return {...state,authData:payload, loading: false, errors: null};
    case LOGOUT:
      localStorage.removeItem("profile")
      return { ...state, authData: null}
    case SIGNIN_WITH_OTP:
      localStorage.setItem('profile',JSON.stringify({ ...payload}))
      return {...state,authData:payload, loading: false, errors: null};
    case UPDATE_PROFILE_IMG:
      return {
        ...state,
        authData: {
          ...state.authData,
          Imglink: payload
        }
      }
    case EDITED_PROFILE:
      const updatedUser = { ...state.authData, ...payload };
      console.log(updatedUser)
      return { authData: updatedUser, error: null };
      default: 
        return state;
  }
}

export default authReducer;