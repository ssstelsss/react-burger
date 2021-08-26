import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  total: '',
  totalToday: '',
  orders: [],
  wsConnected: false,
  wsLoading: false,
  wsError: false,
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsOpenConnection: (state, action) => {
      Object.assign(state, {
        wsConnected: false,
        wsLoading: true,
        wsError: false,
      })
    },
    wsSuccess: state => {
      Object.assign(state, {
        wsConnected: true,
        wsLoading: false,
        wsError: false,
      })
    },
    wsError: state => {
      Object.assign(state, {
        wsConnected: false,
        wsLoading: false,
        wsError: true,
      })
    },
    wsClose: state => {
      Object.assign(state, initialState)
    },
    wsRes: (state, action) => {
      console.log('action.payload: ', action.payload)
      const { orders, success, total, totalToday } = action.payload
      if (!success) {
        Object.assign(state, {
          wsConnected: false,
          wsLoading: false,
          wsError: true,
        })
        return
      }
      Object.assign(state, {
        orders,
        total,
        totalToday,
      })
    },
  },
})

export const { wsOpenConnection, wsSuccess, wsError, wsClose, wsRes } =
  feedSlice.actions

export default feedSlice.reducer
