import React from 'react'
import Main from './main/main'
import Orders from './orders/orders'
import { Switch, useLocation } from 'react-router-dom'
import { ProtectedRoute } from '../../components/protectedRoute/protectedRoute'
import ProfileLink from './profileLink/profileLink'
import styles from './profile.module.css'

export default function Profile() {
  const { pathname } = useLocation()
  return (
    <div className={styles.root}>
      <div className={styles.menu}>
        <ProfileLink to={'/profile'} isActive={pathname === '/profile'}>
          Профиль
        </ProfileLink>
        <ProfileLink
          to={'/profile/orders'}
          isActive={pathname === '/profile/orders'}
        >
          История заказов
        </ProfileLink>
        <ProfileLink to={'/logout'}>Выход</ProfileLink>
      </div>
      <div className='content'>
        <Switch>
          <ProtectedRoute path='/profile' exact={true}>
            <Main />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders' exact={true}>
            <Orders />
          </ProtectedRoute>
          {/* <Route path='/profile/orders/:id' exact={true}>
              <CountryPage />
            </Route> */}
        </Switch>
      </div>
    </div>
  )
}
