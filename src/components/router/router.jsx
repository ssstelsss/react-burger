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
  Feed
} from '../../pages'
import { ProtectedRoute } from '../../components/protectedRoute/protectedRoute'
import { Route, Switch } from 'react-router-dom'

export default function Router() {
  return (
    <Switch>
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
  )
}
