import { createSlice } from '@reduxjs/toolkit'
import { setError } from './appSlice'
import { GET_INGREDIENTS_URL } from '../../utils/constants'
import { CODES } from '../../utils/errors'
import { IIngredient } from '../../types'
import { AppDispatch } from '..'

interface IIngredientsSliceState {
  items: IIngredient[]
  itemsRequest: boolean
  itemsSuccess: boolean
  itemsError: boolean
}

const initialState: IIngredientsSliceState = {
  items: [],
  itemsRequest: false,
  itemsSuccess: false,
  itemsError: false,
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsSuccess: (state, action) => {
      Object.assign(state, {
        items: action.payload,
        itemsRequest: false,
        itemsError: false,
        itemsSuccess: true,
      })
    },
    ingredientsRequest: state => {
      Object.assign(state, {
        itemsRequest: true,
        itemsError: false,
        itemsSuccess: false,
      })
    },
    ingredientsError: state => {
      Object.assign(state, {
        itemsRequest: false,
        itemsError: true,
        itemsSuccess: false,
      })
    },
  },
})

export default ingredientsSlice.reducer
export const { ingredientsSuccess, ingredientsRequest, ingredientsError } =
  ingredientsSlice.actions

export const getItems = () => (dispatch: AppDispatch) => {
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
