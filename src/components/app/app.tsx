import React, { FC, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import Error from '../error/error'
import { BrowserRouter } from 'react-router-dom'
import { getItems } from '../../services/slices/ingredientsSlice'
import Router from '../router/router'
import Loader from '../loader/loader'
import { useAppDispatch, useAppSelector } from '../../services'

const App: FC = () => {
  const error = useAppSelector(store => store.app.error)
  const isIngredients = useAppSelector(store => store.ingredients.itemsSuccess)
  const isOrderResponse = useAppSelector(store => store.order.orderRequest)
  const dispatch = useAppDispatch()

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

export default App