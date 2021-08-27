import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { GET_USER_URL } from '../../utils/constants'
import { getCookie } from '../../utils/cookies'
import { fetchWithRefresh } from '../../utils/helpers'
import { setUserData } from './userSlice'

interface IGetUserDataSliceState {
  getUserDataRequest: boolean
  getUserDataSuccess: boolean
  getUserDataError: boolean
}

const initialState: IGetUserDataSliceState = {
  getUserDataRequest: false,
  getUserDataSuccess: false,
  getUserDataError: false,
}

const getUserDataSlice = createSlice({
  name: 'getUserData',
  initialState,
  reducers: {
    getUserDataSuccess: state => {
      Object.assign(state, {
        getUserDataRequest: false,
        getUserDataSuccess: true,
        getUserDataError: false,
      })
    },
    getUserDataRequest: state => {
      Object.assign(state, {
        getUserDataRequest: true,
        getUserDataError: false,
        getUserDataSuccess: false,
      })
    },
    getUserDataError: state => {
      Object.assign(state, {
        getUserDataRequest: false,
        getUserDataError: true,
        getUserDataSuccess: false,
      })
    },
  },
})

export default getUserDataSlice.reducer
export const { getUserDataError, getUserDataRequest, getUserDataSuccess } =
  getUserDataSlice.actions

export const getUserData = () => (dispatch: AppDispatch) => {
  dispatch(getUserDataRequest())
  fetchWithRefresh(GET_USER_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  })
    .then(response => {
      if (response.success) {
        return response
      }
      return Promise.reject()
    })
    .then(data => {
      dispatch(getUserDataSuccess())
      dispatch(setUserData(data.user))
    })
    .catch(error => {
      dispatch(getUserDataError())
    })
}
