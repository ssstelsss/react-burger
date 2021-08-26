import React, { FC, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FeedDetails from '../../components/feed-details/feed-details'
import { wsOpenConnection, wsClose } from '../../services/slices/feedSlice'
import styles from './order.module.css'

const Order: FC = () => {
  const location = useLocation()
  const params = useParams<{ id: string }>()
  const orders = useSelector((store: any) => store.feed.orders)
  const order = orders.find((el: any) => el._id === params.id)

  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === '/feed') {
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
