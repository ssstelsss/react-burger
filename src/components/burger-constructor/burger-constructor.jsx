import React from 'react'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItem from '../constructor-item/constructor-item'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'

export default function BurgerConstructor ({ data }) {

  const bun = data[0]
  const totalPrice = data.reduce((acc, val) => acc + val.price, 0)

  return(
    <div className={`${styles.root} ml-10 mt-25`}>
      <ConstructorItem 
        type={bun.type}
        text={bun.name}
        price={bun.price}
        isLocked
        isDraggable={false}
        thumbnail={bun.image}
      />
      <div className={styles.scrollableList}>
        {data.map((item) => {
          return (
            <ConstructorItem 
              key={item._id}
              isDraggable
              type={item.type}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          )}
        )}
      </div>
      <ConstructorItem 
        type={bun.type}
        text={bun.name}
        price={bun.price}
        isLocked
        isDraggable={false}
        thumbnail={bun.image}
      />

      <div className={`${styles.confirmBlock} mt-10`}>
        <div className={styles.totalPrice}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }))
}