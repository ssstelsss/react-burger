import { createSlice } from '@reduxjs/toolkit'
import { REGISTRATION_URL } from '../../utils/constants'
import { setCookie } from '../../utils/cookies'
import { setUserData } from './userSlice'

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registrationRequest: false,
    registrationSuccess: false,
    registrationError: false,
  },
  reducers: {
    registrationSuccess: state => {
      Object.assign(state, {
        registrationRequest: false,
        registrationSuccess: true,
        registrationError: false,
      })
    },
    registrationRequest: state => {
      Object.assign(state, {
        registrationRequest: true,
        registrationError: false,
        registrationSuccess: false,
      })
    },
    registrationError: state => {
      Object.assign(state, {
        registrationRequest: false,
        registrationError: true,
        registrationSuccess: false,
      })
    },
  },
})

export default registrationSlice.reducer
export const { registrationSuccess, registrationRequest, registrationError } =
  registrationSlice.actions

export const registration = params => dispatch => {
  dispatch(registrationRequest())
  fetch(REGISTRATION_URL, {
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
      dispatch(registrationSuccess())
      dispatch(setUserData(data.user))
    })
    .catch(error => {
      dispatch(registrationError())
    })
}
