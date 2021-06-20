import React, { useState } from 'react'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItem from '../constructor-item/constructor-item'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useSelector, useDispatch } from 'react-redux'
import { removeIngredientByIndex, addIngredient, setBun } from '../../services/slices/burgerConstructorSlice'
import { setOrder } from '../../services/slices/orderSlice'
import Placeholder from './placeholder/placeholder'
import { useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'

export default function BurgerConstructor () {
  const dispatch = useDispatch()
  const [isModal, setIsModal] = useState(false);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      dispatch(item.type === 'bun' ? setBun(item) : addIngredient(item)) 
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });
  
  const { bun, items, totalPrice } = useSelector(store => store.burgerConstructor)
  const isOrderSuccess = useSelector(store => store.order.orderSuccess)

  function getOrder() {
    setIsModal(true)
    dispatch(setOrder(
      [].concat(
        items.map(item => item._id),
        bun._id,
        bun._id
      ))
    )
  }

  function removeItem (index) {
    dispatch(removeIngredientByIndex(index))
  }

  const isDisabledButton = !items.length || !bun

  return(
    <div ref={dropTarget} className={`${styles.root} ml-10 mt-25`}>
      {
        bun && <ConstructorItem 
          type='top'
          text={`${bun.name} (верх)`}
          price={bun.price}
          isLocked
          thumbnail={bun.image}
        />
      }
      <div className={styles.scrollableList}>
        {items.length ?
          items.map((item, index) => {
            return (
              <ConstructorItem 
                key={item.uniqId}
                isDraggable
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => removeItem(index)}
                index={index}
              />
            )}
          ) 
          : <Placeholder isFieldHover={isHover}/>
        }
      </div>
      {
        bun && <ConstructorItem 
          type='bottom'
          text={`${bun.name} (низ)`}
          price={bun.price}
          isLocked
          thumbnail={bun.image}
        />
      }
      

      <div className={`${styles.confirmBlock} mt-10`}>
        <div className={styles.totalPrice}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <div className={`${isDisabledButton ? styles.disabled : ''} ml-10`}>
          <Button type='primary' size='medium' onClick={getOrder}>
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModal && isOrderSuccess &&
        <Modal onClose={() => setIsModal(false)}>
          <OrderDetails onConfirm={() => setIsModal(false)}/>
        </Modal>
      }
    </div>
  )
}
