import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { setCurrentOrder } from '../../../services/slices/currentOrderSlice'
import IngredientsList from './ingredients-list/ingredients-list'
import styles from './order-list-item.module.css'

type IOrderListItemProps = {
  order: any
  fromOrderPage?: boolean
}

const OrderListItem: FC<IOrderListItemProps> = ({ order, fromOrderPage }) => {
  const allIngredients = useSelector((store: any) => store.ingredients.items)

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const currentCost = order.ingredients.reduce(
    (accumulator: number, el: any) =>
      accumulator + allIngredients.find((item: any) => item._id === el).price,
    0
  )

  function onSelect() {
    dispatch(setCurrentOrder(order))

    const distination = fromOrderPage ? 'profile/orders' : 'feed'

    const _location = {
      pathname: `/${distination}/${order._id}`,
      state: { background: location },
    }
    history.push(_location)
  }

  return (
    <div className={`${styles.root} p-6`} onClick={onSelect}>
      <div className={styles.header}>
        <span className='text text_type_digits-default'>#{order.number}</span>
        <span className='text text_type_main-default text_color_inactive'>
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>
      <div className={styles.title}>
        <span className='text text_type_main-medium'>{order.name}</span>
      </div>
      <div className={styles.footer}>
        <IngredientsList ingredients={order.ingredients} />
        <div className={styles.price}>
          <span className='text text_type_digits-default mr-1'>
            {currentCost}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default OrderListItem
