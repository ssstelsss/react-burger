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
} from '../../pages'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { ProtectedRoute } from '../../components/protectedRoute/protectedRoute'
import { removeCurrentIngredient } from '../../services/slices/currentIngredientSlice'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Router() {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentIngredient = useSelector(store => store.currentIngredient)

  const location = useLocation()
  let background = location.state?.background

  return (
    <>
      <Switch location={background || location}>
        <Route path='/' exact={true}>
          <Constructor />
        </Route>
        <Route forLoggined={false} redirectTo='/' path='/login' exact={true}>
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
        <ProtectedRoute path='/profile'>
          <Profile />
        </ProtectedRoute>
        <Route path='/feed' exact={true}>
          <Feed />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          <Ingredients />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route path='/ingredients/:id' exact={true}>
          {currentIngredient && (
            <Modal
              header={'Детали ингредиента'}
              withHistoryBack
              onClose={() => {
                dispatch(removeCurrentIngredient())
                history.goBack()
              }}
            >
              <IngredientDetails ingredient={currentIngredient} />
            </Modal>
          )}
        </Route>
      )}
    </>
  )
}
