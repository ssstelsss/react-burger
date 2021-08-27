import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './logout.module.css'
import { logout } from '../../services/slices/logoutSlice'
import { useAppDispatch, useAppSelector } from '../../services'

const Logout: FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const logoutSuccess = useAppSelector(store => store.logout.logoutSuccess)

  useEffect(() => {
    if (logoutSuccess) {
      history.replace('/login')
    }
    dispatch(logout())
  }, [logoutSuccess, history, dispatch])

  return (
    <div className={styles.root}>
      <p className='text text_type_main-medium'>Выходим</p>
    </div>
  )
}

export default Logout
