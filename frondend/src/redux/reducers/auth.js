/* eslint-disable */
import { USER_LOGIN, LOGOUT, SIGNIN_WITH_OTP } from '../constants/actionTypes.js';

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
      default: 
        return state;
  }
}

export default authReducer;