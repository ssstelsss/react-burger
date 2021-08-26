import { createSlice } from '@reduxjs/toolkit'

const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState: null,
  reducers: {
    setCurrentOrder: (state, action) => {
      return action.payload
    },
    removeCurrentOrder: (state) => {
      return null
    }
  }
})

export default currentOrderSlice.reducer
export const { setCurrentOrder, removeCurrentOrder } = currentOrderSlice.actions