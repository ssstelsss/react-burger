import { createSlice } from '@reduxjs/toolkit'

const orderModalSlice = createSlice({
  name: 'orderModal',
  initialState: {
    isOrderModalOpen: false
  },
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
