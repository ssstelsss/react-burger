import { createSlice } from '@reduxjs/toolkit'
import { IFeedOrder } from '../../types'

interface ICurrentOrderSliceState {
  order: IFeedOrder
  isOrder: boolean
}

const initialState: ICurrentOrderSliceState = {
  order: {} as IFeedOrder,
  isOrder: false,
}

const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      Object.assign(state, {
        order: action.payload,
        isOrder: true,
      })
    },
    removeCurrentOrder: state => {
      Object.assign(state, {
        order: {} as IFeedOrder,
        isOrder: false,
      })
    },
  },
})

export default currentOrderSlice.reducer
export const { setCurrentOrder, removeCurrentOrder } = currentOrderSlice.actions
