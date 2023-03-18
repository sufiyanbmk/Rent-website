/* eslint-disable */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
  user:userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export default configureStore({
 reducer:persistedReducer
})
