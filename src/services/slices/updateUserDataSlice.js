import { createSlice } from '@reduxjs/toolkit'
import { GET_USER_URL } from '../../utils/constants'
import { getCookie } from '../../utils/cookies'
import { fetchWithRefresh } from '../../utils/helpers'
import { setUserData } from './userSlice'

const updateUserDataSlice = createSlice({
  name: 'updateUserData',
  initialState: {
    updateUserDataRequest: false,
    updateUserDataSuccess: false,
    updateUserDataError: false,
  },
  reducers: {
    updateUserDataSuccess: state => {
      Object.assign(state, {
        updateUserDataRequest: false,
        updateUserDataSuccess: true,
        updateUserDataError: false,
      })
    },
    updateUserDataRequest: state => {
      Object.assign(state, {
        updateUserDataRequest: true,
        updateUserDataError: false,
        updateUserDataSuccess: false,
      })
    },
    updateUserDataError: state => {
      Object.assign(state, {
        updateUserDataRequest: false,
        updateUserDataError: true,
        updateUserDataSuccess: false,
      })
    },
  },
})

export default updateUserDataSlice.reducer
export const {
  updateUserDataError,
  updateUserDataRequest,
  updateUserDataSuccess,
} = updateUserDataSlice.actions

export const updateUserData = data => dispatch => {
  dispatch(updateUserDataRequest())
  fetchWithRefresh(GET_USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(data),
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
      dispatch(updateUserDataSuccess())
      dispatch(setUserData(data.user))
    })
    .catch(error => {
      dispatch(updateUserDataError())
    })
}
