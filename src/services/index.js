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
  feedSlice,
  currentOrderSlice,
} from './slices'
import { wsMiddleware } from './middlewares'

const middlewares = [wsMiddleware()]

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
  feed: feedSlice,
  currentOrder: currentOrderSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
})
