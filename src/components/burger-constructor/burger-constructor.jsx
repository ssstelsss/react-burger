import React, { useEffect } from 'react'
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItem from '../constructor-item/constructor-item'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useSelector, useDispatch } from 'react-redux'
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

export default function BurgerConstructor() {
  const dispatch = useDispatch()
  const isOrderModalOpen = useSelector(
    store => store.orderModal.isOrderModalOpen
  )
  const { isLogined } = useSelector(store => store.user)
  const history = useHistory()

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      dispatch(item.type === 'bun' ? setBun(item) : addIngredient(item))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  })

  const { bun, items, totalPrice } = useSelector(
    store => store.burgerConstructor
  )

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  function getOrder() {
    if (isLogined) {
      dispatch(
        setOrder(
          [].concat(
            items.map(item => item._id),
            bun._id,
            bun._id
          )
        )
      )
    } else {
      const location = {
        pathname: '/login',
        state: { from: '/' },
      }
      history.replace(location)
    }
  }

  function removeItem(index) {
    dispatch(removeIngredientByIndex(index))
  }

  const isDisabledButton = !items.length || !bun

  return (
    <div ref={dropTarget} className={`${styles.root} ml-10 mt-25`}>
      {bun && (
        <ConstructorItem
          type='top'
          text={`${bun.name} (????????)`}
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
          text={`${bun.name} (??????)`}
          price={bun.price}
          isLocked
          thumbnail={bun.image}
        />
      )}

      <div className={`${styles.confirmBlock} mt-10`}>
        <div className={styles.totalPrice}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <div className={`${isDisabledButton ? styles.disabled : ''} ml-10`}>
          <Button type='primary' size='medium' onClick={getOrder}>
            ???????????????? ??????????
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
