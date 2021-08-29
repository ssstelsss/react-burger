import { createSlice } from '@reduxjs/toolkit'

interface IOrderModalSliceState {
  isOrderModalOpen: boolean
}

const initialState: IOrderModalSliceState = {
  isOrderModalOpen: false,
}

const orderModalSlice = createSlice({
  name: 'orderModal',
  initialState,
  reducers: {
    openOrderModal: state => {
      Object.assign(state, {
        isOrderModalOpen: true,
      })
    },
    closeOrderModal: state => {
      Object.assign(state, {
        isOrderModalOpen: false,
      })
    },
  },
})

export default orderModalSlice.reducer
export const { openOrderModal, closeOrderModal } = orderModalSlice.actions
