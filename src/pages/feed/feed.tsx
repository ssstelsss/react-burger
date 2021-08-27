import React, { FC, useEffect } from 'react'
import { wsOpenConnection, wsClose } from '../../services/slices/feedSlice'
import OrderList from '../../components/order-list/order-list'
import FeedTimePanel from '../../components/feed-time-panel/feed-time-panel'
import styles from './feed.module.css'
import Loader from '../../components/loader/loader'
import { useAppDispatch, useAppSelector } from '../../services'

const Feed: FC = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(store => store.feed.orders)

  useEffect(() => {
    dispatch(
      wsOpenConnection({
        url: 'wss://norma.nomoreparties.space/orders/all',
      })
    )

    return () => {
      dispatch(wsClose())
    }
  }, [dispatch])
  return (
    <>
      {orders.length ? (
        <div className={`${styles.root} pt-8`}>
          <div className={styles.orderListBlock}>
            <p className='text text_type_main-medium'>Лента заказов</p>
            <OrderList />
          </div>
          <FeedTimePanel />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Feed
