import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogined: false,
    loginRequest: false,
    loginSuccess: false,
    loginError: false,
    email: '',
    name: '',
  },
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
