import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import OrderList from '../../../components/order-list/order-list'
import { wsOpenConnection, wsClose } from '../../../services/slices/feedSlice'
import styles from './orders.module.css'

export default function Orders() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      wsOpenConnection({
        url: 'wss://norma.nomoreparties.space/orders',
        personal: true,
      })
    )
    return () => {
      dispatch(wsClose())
    }
  }, [dispatch])
  return (
    <div className={styles.root}>
      <OrderList fromOrderPage />
    </div>
  )
}