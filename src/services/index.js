import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ingredientsSlice, appSlice, burgerConstructorSlice, orderSlice, currentIngredientSlice } from './slices'

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  order: orderSlice,
  currentIngredient: currentIngredientSlice,
  app: appSlice
})

export const store = configureStore({
  reducer: rootReducer
})