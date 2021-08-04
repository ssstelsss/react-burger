import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import Error from '../error/error'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { getItems } from '../../services/slices/ingredientsSlice'
import Router from '../router/router'
import Loader from '../loader/loader'

export default function App() {
  const error = useSelector(store => store.app.error)
  const isIngredients = useSelector(store => store.ingredients.itemsSuccess)
  const isOrderResponse = useSelector(store => store.order.orderRequest)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  function isLoader() {
    return !isIngredients ||isOrderResponse
  }

  return (
    <div>
      <BrowserRouter>
        <AppHeader />
        {error ? <Error code={error} /> : isLoader() ? <Loader /> : <Router />}
      </BrowserRouter>
    </div>
  )
}
