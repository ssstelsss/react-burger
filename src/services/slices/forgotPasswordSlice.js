import { createSlice } from '@reduxjs/toolkit'
import { FORGOT_PASSWORD_URL } from '../../utils/constants'

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
  },
  reducers: {
    forgotPasswordSuccess: (state, action) => {
      Object.assign(state, {
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
        forgotPasswordError: false,
      })
    },
    forgotPasswordRequest: state => {
      Object.assign(state, {
        forgotPasswordRequest: true,
        forgotPasswordError: false,
        forgotPasswordSuccess: false,
      })
    },
    forgotPasswordError: state => {
      Object.assign(state, {
        forgotPasswordRequest: false,
        forgotPasswordError: true,
        forgotPasswordSuccess: false,
      })
    },
  },
})

export default forgotPasswordSlice.reducer
export const {
  forgotPasswordSuccess,
  forgotPasswordRequest,
  forgotPasswordError,
} = forgotPasswordSlice.actions

export const forgotPassword = params => dispatch => {
  dispatch(forgotPasswordRequest())
  fetch(FORGOT_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.status)
    })
    .then(data => {
      dispatch(forgotPasswordSuccess())
    })
    .catch(error => {
      dispatch(forgotPasswordError())
    })
}
