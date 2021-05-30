import React from 'react'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItem from '../constructor-item/constructor-item'
import selectedData from '../../utils/selected-data'
import styles from './burger-constructor.module.css'

export default function BurgerConstructor () {

  const firstItem = selectedData[0]
  const totalPrice = selectedData.reduce((acc, val) => acc + val.price, 0)

  return(
    <div className={`${styles.root} ml-10 mt-25`}>
      <ConstructorItem 
        type={firstItem.type}
        text={firstItem.name}
        price={firstItem.price}
        isLocked
        hasIcon={false}
        thumbnail={firstItem.image}
      />
      <div className={styles.scrollableList}>
        {selectedData.map((item, index) => {
          return (
            <ConstructorItem 
              key={item._id + index}
              hasIcon
              type={item.type}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          )}
        )}
      </div>
      <ConstructorItem 
        type={firstItem.type}
        text={firstItem.name}
        price={firstItem.price}
        isLocked
        hasIcon={false}
        thumbnail={firstItem.image}
      />

      <div className={`${styles.confirmBlock} mt-10`}>
        <div className={styles.totalPrice}>
          <p className='text text_type_digits-medium'>{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <div className="ml-10">
          <Button type='primary' size='medium'>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
}