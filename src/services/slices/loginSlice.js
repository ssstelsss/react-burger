import { createSlice } from '@reduxjs/toolkit'
import { LOGIN_URL } from '../../utils/constants'
import { setCookie } from '../../utils/cookies'
import { setUserData } from './userSlice'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginRequest: false,
    loginSuccess: false,
    loginError: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      Object.assign(state, {
        loginRequest: false,
        loginSuccess: true,
        loginError: false,
      })
    },
    loginRequest: state => {
      Object.assign(state, {
        loginRequest: true,
        loginError: false,
        loginSuccess: false,
      })
    },
    loginError: state => {
      Object.assign(state, {
        loginRequest: false,
        loginError: true,
        loginSuccess: false,
      })
    },
  },
})

export default loginSlice.reducer
export const { loginSuccess, loginRequest, loginError } = loginSlice.actions

export const login = params => dispatch => {
  dispatch(loginRequest())
  fetch(LOGIN_URL, {
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
      setCookie('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      dispatch(loginSuccess())
      dispatch(setUserData(data.user))
    })
    .catch(error => {
      dispatch(loginError())
    })
}
