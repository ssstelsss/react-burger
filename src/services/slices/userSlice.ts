import { createSlice } from '@reduxjs/toolkit'

interface IUserSliceState {
  isLogined: boolean
  loginRequest: boolean
  loginSuccess: boolean
  loginError: boolean
  email: string
  name: string
}

const initialState: IUserSliceState = {
  isLogined: false,
  loginRequest: false,
  loginSuccess: false,
  loginError: false,
  email: '',
  name: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      Object.assign(state, {
        email: action.payload.email,
        name: action.payload.name,
        isLogined: true,
      })
    },
    logoutUser: state => {
      Object.assign(state, {
        isLogined: false,
        loginRequest: false,
        loginSuccess: false,
        loginError: false,
      })
    },
  },
})

export default userSlice.reducer
export const { setUserData, logoutUser } = userSlice.actions
