import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import OrderListItem from './order-list-item/order-list-item'
import styles from './order-list.module.css'

interface IOrderListProps {
  fromOrderPage?: boolean
}

const OrderList: FC<IOrderListProps> = ({ fromOrderPage }) => {
  const orders = useSelector((store: any) => store.feed.orders)

  return (
    <div className={styles.root}>
      {orders.map((order: any) => (
        <OrderListItem key={order._id} order={order} fromOrderPage={fromOrderPage} />
      ))}
    </div>
  )
}

export default OrderList
