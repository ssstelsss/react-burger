import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { FORGOT_PASSWORD_URL } from '../../utils/constants'

interface IForgotPasswordSliceState {
  forgotPasswordRequest: boolean
  forgotPasswordSuccess: boolean
  forgotPasswordError: boolean
}

interface IForgotPasswordParams {
  email: string
}

const initialState: IForgotPasswordSliceState = {
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordError: false,
}

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    forgotPasswordSuccess: state => {
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

export const forgotPassword =
  (params: IForgotPasswordParams) => (dispatch: AppDispatch) => {
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
      .then(() => {
        dispatch(forgotPasswordSuccess())
      })
      .catch(error => {
        dispatch(forgotPasswordError())
      })
  }
