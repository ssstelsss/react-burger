import { createSlice } from '@reduxjs/toolkit'
import { IIngredient } from '../../types'

const initialState: IIngredient | null = null

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      return action.payload
    },
    removeCurrentIngredient: state => {
      return null
    },
  },
})

export default currentIngredientSlice.reducer
export const { setCurrentIngredient, removeCurrentIngredient } =
  currentIngredientSlice.actions
