import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    error: '',
    loader: false,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = ''
    }
  }
})

export default appSlice.reducer
export const { setError, clearError } = appSlice.actions