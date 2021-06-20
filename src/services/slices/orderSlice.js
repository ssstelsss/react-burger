import { createSlice } from '@reduxjs/toolkit'
import { SET_ORDER_URL } from '../../utils/constants'
import { setError } from './appSlice'
import { CODES } from '../../utils/errors'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    result: {},
    orderRequest: false,
    orderSuccess: false,
    orderError: false
  },
  reducers: {
    orderSuccess: (state, action) => {
      Object.assign(state, {
        result: action.payload,
        orderRequest: false,
        orderError: false,
        orderSuccess: true
      })
    },
    orderRequest: (state) => {
      Object.assign(state, {
        orderRequest: true,
        orderError: false,
        orderSuccess: false
      })
    },
    orderError: (state) => {
      Object.assign(state, {
        orderRequest: false,
        orderError: true,
        orderSuccess: false  
      })
    }
  }
})

export default orderSlice.reducer
export const { orderSuccess, orderRequest, orderError } = orderSlice.actions

export const setOrder = ingredients => dispatch => {
  dispatch(orderRequest())
  fetch(SET_ORDER_URL, {
    method: 'POST',
    body: JSON.stringify({ingredients}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.status)
    })
    .then(data => {
      dispatch(orderSuccess(data))
    })
    .catch(err => {
      dispatch(orderError())
      dispatch(setError(CODES.SERVER_ERR))
    })
}