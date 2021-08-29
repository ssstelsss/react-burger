import React, { FC, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import FeedDetails from '../../components/feed-details/feed-details'
import { wsOpenConnection, wsClose } from '../../services/slices/feedSlice'
import styles from './order.module.css'
import { useAppDispatch, useAppSelector } from '../../services'

const Order: FC = () => {
  const location = useLocation()
  const params = useParams<{ id: string }>()
  const orders = useAppSelector(store => store.feed.orders)
  const order = orders.find(el => el._id === params.id)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      dispatch(
        wsOpenConnection({
          url: 'wss://norma.nomoreparties.space/orders/all',
        })
      )
    } else {
      dispatch(
        wsOpenConnection({
          url: 'wss://norma.nomoreparties.space/orders',
          personal: true,
        })
      )
    }
    return () => {
      dispatch(wsClose())
    }
  }, [dispatch, location.pathname])

  return (
    <div className={`${styles.root} mt-30`}>
      <div className={styles.wrapper}>
        {order && <FeedDetails order={order} withNumber />}
      </div>
    </div>
  )
}

export default Order
