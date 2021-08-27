import { createSlice } from '@reduxjs/toolkit'
import { IFeedOrder } from '../../types'

const initialState: IFeedOrder = {} as IFeedOrder

const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state = action.payload as IFeedOrder
    },
    removeCurrentOrder: state => {
      state = {} as IFeedOrder
    },
  },
})

export default currentOrderSlice.reducer
export const { setCurrentOrder, removeCurrentOrder } = currentOrderSlice.actions
