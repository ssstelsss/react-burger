import React, { FC } from 'react'
import Main from './main/main'
import Orders from './orders/orders'
import { Switch, useLocation } from 'react-router-dom'
import ProfileLink from './profileLink/profileLink'
import styles from './profile.module.css'
import ProtectedRoute from '../../components/protectedRoute/protectedRoute'

const Profile: FC = () => {
  const { pathname } = useLocation()
  return (
    <div className={styles.root}>
      <div className={`${styles.menu} mt-30`}>
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
            <div className='mt-30'>
              <Main />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders' exact={true}>
            <div className='mt-9'>
              <Orders />
            </div>
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  )
}

export default Profile
