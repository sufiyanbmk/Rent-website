/* eslint-disable */
import { USER_LOGIN, LOGOUT, SIGNIN_WITH_OTP, UPDATE_PROFILE_IMG, EDITED_PROFILE } from '../constants/actionTypes.js';

const authReducer = (state = {authData:null},{type,payload}) => {
  switch ( type ){
    case USER_LOGIN:
      const token  = payload.token
      localStorage.setItem('access_token',token)
      return {...state,authData:payload, loading: false, errors: null};
    case LOGOUT:
      localStorage.removeItem("access_token")
      return { ...state, authData: null}
    case SIGNIN_WITH_OTP:
      localStorage.setItem('profile',JSON.stringify({ ...payload}))
      return {...state,authData:payload, loading: false, errors: null};
    case UPDATE_PROFILE_IMG:
      return {
        ...state,
        authData: {
          ...state.authData,
          profileImage: payload
        }
      }
    case EDITED_PROFILE:
      const updatedUser = { ...state.authData, ...payload };
      return { authData: updatedUser, error: null };
      default: 
        return state;
  }
}

export default authReducer;