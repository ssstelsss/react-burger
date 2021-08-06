import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  ingredientsSlice,
  appSlice,
  burgerConstructorSlice,
  orderSlice,
  currentIngredientSlice,
  userSlice,
  registrationSlice,
  updateUserDataSlice,
  getUserDataSlice,
  loginSlice,
  forgotPasswordSlice,
  resetPasswordSlice,
  logoutSlice,
  orderModalSlice,
} from './slices'

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  order: orderSlice,
  currentIngredient: currentIngredientSlice,
  app: appSlice,
  user: userSlice,
  registration: registrationSlice,
  updateUser: updateUserDataSlice,
  login: loginSlice,
  getUserData: getUserDataSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  logout: logoutSlice,
  orderModal: orderModalSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})
