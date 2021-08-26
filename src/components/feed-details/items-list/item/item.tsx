import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import styles from './item.module.css'

interface IItemProps {
  item: any
}

const Item: FC<IItemProps> = ({ item }) => {
  return (
    <div className={`${styles.root}`}>
      <div className={styles.infoBlock}>
        <div className={styles.imageWrapper}>
          <img src={item.image_mobile} alt={item.name} />
        </div>
        <div className={styles.name}>
          <span className='text text_type_main-medium'>{item.name}</span>
        </div>
      </div>
      
      <div className={styles.priceBlock}>
        <span className='text text_type_digits-default mr-1'>{item.count} X {item.price}</span>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  )
}

export default Item
