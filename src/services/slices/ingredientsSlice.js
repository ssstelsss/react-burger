import { createSlice } from '@reduxjs/toolkit'
import { setError } from './appSlice'
import { GET_INGREDIENTS_URL } from '../../utils/constants'
import { CODES } from '../../utils/errors'

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: [],
    itemsRequest: false,
    itemsSuccess: false,
    itemsError: false
  },
  reducers: {
    ingredientsSuccess: (state, action) => {
      return {
        items: action.payload,
        itemsRequest: false,
        itemsError: false,
        itemsSuccess: true
      }
    },
    ingredientsRequest: (state) => {
      return {
        itemsRequest: true,
        itemsError: false,
        itemsSuccess: false
      }
    },
    ingredientsError: (state) => {
      return {
        itemsRequest: false,
        itemsError: true,
        itemsSuccess: false  
      }    
    }
  }
})

export default ingredientsSlice.reducer
export const { ingredientsSuccess, ingredientsRequest, ingredientsError } = ingredientsSlice.actions


export const getItems = () => dispatch => {
  dispatch(ingredientsRequest())
  fetch(GET_INGREDIENTS_URL)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.status)
    })
    .then(data => {
      dispatch(ingredientsSuccess(data.data))
    })
    .catch(err => {
      dispatch(ingredientsError())
      dispatch(setError(CODES.SERVER_ERR))
    })
}