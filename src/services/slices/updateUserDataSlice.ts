import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { GET_USER_URL } from '../../utils/constants'
import { getCookie } from '../../utils/cookies'
import { fetchWithRefresh } from '../../utils/helpers'
import { setUserData } from './userSlice'

interface IUpdateUserDataSliceParams {
  name: string
  email: string
  password: string
}

interface IUpdateUserDataSliceState {
  updateUserDataRequest: boolean
  updateUserDataSuccess: boolean
  updateUserDataError: boolean
}

const initialState: IUpdateUserDataSliceState = {
  updateUserDataRequest: false,
  updateUserDataSuccess: false,
  updateUserDataError: false,
}

const updateUserDataSlice = createSlice({
  name: 'updateUserData',
  initialState,
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

export const updateUserData =
  (params: IUpdateUserDataSliceParams) => (dispatch: AppDispatch) => {
    dispatch(updateUserDataRequest())
    fetchWithRefresh(GET_USER_URL, {
      method: 'PATCH',
      body: JSON.stringify(params),
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
