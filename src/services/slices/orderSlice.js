import { createSlice } from '@reduxjs/toolkit'
import { SET_ORDER_URL } from '../../utils/constants'
import { setError } from './appSlice'
import { cleanConstructor } from './burgerConstructorSlice'
import { openOrderModal } from './orderModalSlice'
import { CODES } from '../../utils/errors'
import { fetchWithRefresh } from '../../utils/helpers'
import { getCookie } from '../../utils/cookies'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    result: {},
    orderRequest: false,
    orderSuccess: false,
    orderError: false,
  },
  reducers: {
    orderSuccess: (state, action) => {
      Object.assign(state, {
        result: action.payload,
        orderRequest: false,
        orderError: false,
        orderSuccess: true,
      })
    },
    orderRequest: state => {
      Object.assign(state, {
        orderRequest: true,
        orderError: false,
        orderSuccess: false,
      })
    },
    orderError: state => {
      Object.assign(state, {
        orderRequest: false,
        orderError: true,
        orderSuccess: false,
      })
    },
  },
})

export default orderSlice.reducer
export const { orderSuccess, orderRequest, orderError } = orderSlice.actions

export const setOrder = ingredients => dispatch => {
  dispatch(orderRequest())
  fetchWithRefresh(SET_ORDER_URL, {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  })
    .then(data => {
      dispatch(orderSuccess(data))
      dispatch(openOrderModal())
      dispatch(cleanConstructor())
    })
    .catch(err => {
      dispatch(orderError())
      dispatch(setError(CODES.SERVER_ERR))
    })
}
