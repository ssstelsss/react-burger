import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { LOGOUT_URL } from '../../utils/constants'
import { deleteCookie } from '../../utils/cookies'
import { logoutUser } from './userSlice'

interface ILogoutSliceState {
  logoutRequest: boolean
  logoutSuccess: boolean
  logoutError: boolean
}

const initialState: ILogoutSliceState = {
  logoutRequest: false,
  logoutSuccess: false,
  logoutError: false,
}

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logoutSuccess: state => {
      Object.assign(state, {
        logoutRequest: false,
        logoutSuccess: true,
        logoutError: false,
      })
    },
    logoutRequest: state => {
      Object.assign(state, {
        logoutRequest: true,
        logoutError: false,
        logoutSuccess: false,
      })
    },
    logoutError: state => {
      Object.assign(state, {
        logoutRequest: false,
        logoutError: true,
        logoutSuccess: false,
      })
    },
  },
})

export default logoutSlice.reducer
export const { logoutSuccess, logoutRequest, logoutError } = logoutSlice.actions

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(logoutRequest())
  fetch(LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
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
      deleteCookie('accessToken')
      localStorage.clear()
      dispatch(logoutSuccess())
      dispatch(logoutUser())
    })
    .catch(error => {
      dispatch(logoutError())
    })
}
