import { createSlice } from '@reduxjs/toolkit'
import { RESET_PASSWORD_URL } from '../../utils/constants'

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordError: false,
  },
  reducers: {
    resetPasswordSuccess: state => {
      Object.assign(state, {
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
        resetPasswordError: false,
      })
    },
    resetPasswordRequest: state => {
      Object.assign(state, {
        resetPasswordRequest: true,
        resetPasswordError: false,
        resetPasswordSuccess: false,
      })
    },
    resetPasswordError: state => {
      Object.assign(state, {
        resetPasswordRequest: false,
        resetPasswordError: true,
        resetPasswordSuccess: false,
      })
    },
  },
})

export default resetPasswordSlice.reducer
export const {
  resetPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
} = resetPasswordSlice.actions

export const resetPassword = data => dispatch => {
  dispatch(resetPasswordRequest())
  fetch(RESET_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.status)
    })
    .then(data => {
      dispatch(resetPasswordSuccess())
    })
    .catch(error => {
      dispatch(resetPasswordError())
    })
}
