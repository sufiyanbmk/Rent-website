/* eslint-disable */
import { AUTH, LOGOUT, SIGNIN_WITH_OTP } from '../constants/actionTypes.js';

const authReducer = (state = {authData:null},action) => {
  switch ( action.type ){
    case AUTH:
      localStorage.setItem('profile',JSON.stringify({ ...action?.data}))
      return {...state,authData:action?.data, loading: false, errors: null};
    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null}
    case SIGNIN_WITH_OTP:
      localStorage.setItem('profile',JSON.stringify({ ...action?.data}))
      return {...state,authData:action?.data, loading: false, errors: null};
      default: 
        return state;
  }
}

export default authReducer;