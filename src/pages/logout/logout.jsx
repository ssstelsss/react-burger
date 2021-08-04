import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './logout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/slices/logoutSlice'

export default function Logout() {
  const dispatch = useDispatch()
  const history = useHistory()
  const logoutSuccess = useSelector(store => store.logout.logoutSuccess)

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
