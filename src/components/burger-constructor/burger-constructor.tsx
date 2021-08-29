import React, { FC, useEffect } from 'react'
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItem from '../constructor-item/constructor-item'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import {
  removeIngredientByIndex,
  addIngredient,
  setBun,
} from '../../services/slices/burgerConstructorSlice'
import { setOrder } from '../../services/slices/orderSlice'
import Placeholder from './placeholder/placeholder'
import { getUserData } from '../../services/slices/getUserDataSlice'
import { closeOrderModal } from '../../services/slices/orderModalSlice'
import { useHistory } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'
import { useAppDispatch, useAppSelector } from '../../services'
import { IIngredient } from '../../types'

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch()
  const isOrderModalOpen = useAppSelector(
    store => store.orderModal.isOrderModalOpen
  )
  const { isLogined } = useAppSelector(store => store.user)
  const history = useHistory()

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item: IIngredient) {
      dispatch(item.type === 'bun' ? setBun(item) : addIngredient(item))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  })

  const { bun, items, totalPrice } = useAppSelector(
    store => store.burgerConstructor
  )

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  function getOrder() {
    if (isLogined) {
      const res = [...items.map(item => item._id)]
      if (bun) {
        res.push(bun._id)
      }
      dispatch(setOrder(res))
    } else {
      const location = {
        pathname: '/login',
        state: { from: '/' },
      }
      history.replace(location)
    }
  }

  function removeItem(index: number) {
    dispatch(removeIngredientByIndex(index))
  }

  const isDisabledButton = !items.length || !bun

  return (
    <div ref={dropTarget} className={`${styles.root} ml-10 mt-25`} id='drop'>
      {bun && (
        <ConstructorItem
          type='top'
          text={`${bun.name} (верх)`}
          price={bun.price}
          isLocked
          thumbnail={bun.image}
        />
      )}
      <div className={styles.scrollableList}>
        {items.length ? (
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
            )
          })
        ) : (
          <Placeholder isFieldHover={isHover} />
        )}
      </div>
      {bun && (
        <ConstructorItem
          type='bottom'
          text={`${bun.name} (низ)`}
          price={bun.price}
          isLocked
          thumbnail={bun.image}
        />
      )}

      <div className={`${styles.confirmBlock} mt-10`}>
        <div className={styles.totalPrice}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <div className={`${isDisabledButton ? styles.disabled : ''} ml-10`}>
          <Button type='primary' size='medium' onClick={getOrder}>
            Оформить заказ
          </Button>
        </div>
      </div>

      {isOrderModalOpen && (
        <Modal onClose={() => dispatch(closeOrderModal())}>
          <OrderDetails onConfirm={() => dispatch(closeOrderModal())} />
        </Modal>
      )}
    </div>
  )
}

export default BurgerConstructor
