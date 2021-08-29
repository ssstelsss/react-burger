import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../services'
import { setCurrentOrder } from '../../../services/slices/currentOrderSlice'
import { IFeedOrder } from '../../../types'
import IngredientsList from './ingredients-list/ingredients-list'
import styles from './order-list-item.module.css'

type IOrderListItemProps = {
  order: IFeedOrder
  fromOrderPage?: boolean
}

const OrderListItem: FC<IOrderListItemProps> = ({ order, fromOrderPage }) => {
  const allIngredients = useAppSelector(store => store.ingredients.items)

  const dispatch = useAppDispatch()
  const history = useHistory()
  const location = useLocation()

  const currentCost = order.ingredients.reduce((accumulator: number, el) => {
    const newPrice = allIngredients.find(item => item._id === el)?.price || 0
    return accumulator + newPrice
  }, 0)

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
