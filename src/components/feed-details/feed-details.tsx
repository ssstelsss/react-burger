import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { useAppSelector } from '../../services'
import { IFeedOrder } from '../../types'
import styles from './feed-details.module.css'
import ItemsList from './items-list/items-list'

interface IFeedDetailsProps {
  order: IFeedOrder
  withNumber?: boolean
}

const getStatusItem = (status: string) => {
  switch (status) {
    case 'done':
      return {
        title: 'Выполнен',
        color: '#00CCCC',
      }
    case 'cancel':
      return {
        title: 'Отменен',
        color: 'yellow',
      }
    case 'created':
      return {
        title: 'Создан',
        color: 'blue',
      }
    default:
      return {
        title: '',
        color: '#F2F2F3',
      }
  }
}

const FeedDetails: FC<IFeedDetailsProps> = ({ order, withNumber }) => {
  const status = getStatusItem(order.status)

  const allIngredients = useAppSelector(store => store.ingredients.items)

  const currentCost = order.ingredients.reduce((accumulator: number, el) => {
    const newPrice = allIngredients.find(item => item._id === el)?.price || 0
    return accumulator + newPrice
  }, 0)
  return (
    <div className={`${styles.root}`}>
      {withNumber ? (
        <div className={`${styles.number} pb-5`}>
          <span className='text text_type_digits-default'>#{order.number}</span>
        </div>
      ) : null}

      <div className={styles.title}>
        <span className='text text_type_main-medium pb-2'>{order.name}</span>
        <span style={{ color: status.color }} className={styles.status}>
          {status.title}
        </span>
      </div>

      <div className={`${styles.content} mt-15`}>
        <span className='text text_type_main-medium'>Состав:</span>
        <ItemsList ingredients={order.ingredients} />
        <div className={`${styles.timeAndPriceBlock} mt-5`}>
          <span className='text text_type_main-default text_color_inactive'>
            {new Date(order.createdAt).toLocaleString()}
          </span>
          <div className={styles.price}>
            <span className='text text_type_digits-default mr-1'>
              {currentCost}
            </span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedDetails
