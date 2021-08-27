import React from 'react'
import Constructor from '../constructor/constructor'
import {
  Login,
  NotFound,
  Register,
  ResetPassword,
  ForgotPassword,
  Profile,
  Logout,
  Ingredients,
  Feed,
  Order,
} from '../../pages'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { removeCurrentIngredient } from '../../services/slices/currentIngredientSlice'
import { removeCurrentOrder } from '../../services/slices/currentOrderSlice'
import FeedDetails from '../../components/feed-details/feed-details'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services'
import ProtectedRoute from '../protectedRoute/protectedRoute'
import * as H from 'history'

export default function Router() {
  const dispatch = useAppDispatch()
  const location = useLocation<{ background?: H.Location }>()
  const history = useHistory()

  const currentIngredient = useAppSelector(store => store.currentIngredient)
  const currentOrder = useAppSelector(store => store.currentOrder)

  const background =
    history.action === 'PUSH' && location.state && location.state.background

  return (
    <>
      <Switch location={background || location}>
        <Route path='/' exact={true}>
          <Constructor />
        </Route>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <ProtectedRoute
          forLoggined={false}
          path='/register'
          redirectTo='/'
          exact={true}
        >
          <Register />
        </ProtectedRoute>
        <ProtectedRoute
          forLoggined={false}
          path='/forgot-password'
          redirectTo='/'
          exact={true}
        >
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute
          forLoggined={false}
          path='/reset-password'
          redirectTo='/'
          exact={true}
        >
          <ResetPassword />
        </ProtectedRoute>
        <Route path='/logout' exact={true}>
          <Logout />
        </Route>
        <ProtectedRoute path='/profile/orders/:id' exact={true}>
          <Order />
        </ProtectedRoute>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/feed' exact={true}>
          <Feed />
        </Route>
        <Route path='/feed/:id' exact={true}>
          <Order />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          <Ingredients />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path='/ingredients/:id' exact={true}>
            {currentIngredient && (
              <Modal
                header={'Детали ингредиента'}
                onClose={() => {
                  dispatch(removeCurrentIngredient())
                  history.goBack()
                }}
              >
                <IngredientDetails ingredient={currentIngredient} />
              </Modal>
            )}
          </Route>
          <Route path='/feed/:id' exact={true}>
            {currentOrder && (
              <Modal
                header={`#${currentOrder.number}`}
                onClose={() => {
                  dispatch(removeCurrentOrder())
                  history.goBack()
                }}
              >
                <div className='mt-5'>
                  <FeedDetails order={currentOrder} />
                </div>
              </Modal>
            )}
          </Route>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            {currentOrder && (
              <Modal
                header={`#${currentOrder.number}`}
                onClose={() => {
                  dispatch(removeCurrentOrder())
                  history.goBack()
                }}
              >
                <div className='mt-5'>
                  <FeedDetails order={currentOrder} />
                </div>
              </Modal>
            )}
          </ProtectedRoute>
        </Switch>
      )}
    </>
  )
}
