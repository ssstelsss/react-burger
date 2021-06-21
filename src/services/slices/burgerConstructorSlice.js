import { createSlice } from '@reduxjs/toolkit'

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    items: [],
    totalPrice: 0
  },
  reducers: {
    addIngredient: (state, action) => {
      state.items.push({ ...action.payload, uniqId: Date.now() })
      state.totalPrice += action.payload.price
    },
    removeIngredientByIndex: (state, action) => {
      state.totalPrice -= state.items[action.payload].price
      state.items.splice(action.payload, 1)
    },
    setBun: (state, action) => {
      if (state.bun) {
        state.totalPrice -= state.bun.price * 2
      } 
      state.bun = action.payload
      state.totalPrice += action.payload.price * 2
    },
    swapItems: (state, action) => {
      const firstIndex = action.payload[0]
      const secondIndex = action.payload[1]
      const temp = state.items[firstIndex]
      state.items[firstIndex] = state.items[secondIndex]
      state.items[secondIndex] = temp
    },
    cleanConstructor: (state) => {
      return {
        bun: null,
        items: [],
        totalPrice: 0
      }
    }
  }
})

export default constructorSlice.reducer
export const { addIngredient, removeIngredientByIndex, setBun, swapItems, cleanConstructor } = constructorSlice.actions