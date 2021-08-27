import React, { FC } from 'react'
import orderCheck from '../../images/orderCheck.gif'
import styles from './order-details.module.css'
import { useAppSelector } from '../../services'

interface IOrderDetailsProps {
  onConfirm: () => void
}

const OrderDetails: FC<IOrderDetailsProps> = ({ onConfirm }) => {
  const order = useAppSelector(store => store.order.result)
  return (
    <section className={`${styles.root} pt-8 pb-20`}>
      <span className={`${styles.code} text text_type_digits-large`}>
        {order.order.number}
      </span>
      <span className={`${styles.idLabel} text text_type_main-medium`}>
        идентификатор заказа
      </span>
      <div className={styles.imgBlock} onClick={onConfirm}>
        <img src={orderCheck} alt='confirm order' />
      </div>
      <span className={`${styles.orderStatus} text text_type_main-default`}>
        Ваш заказ начали готовить
      </span>
      <span
        className={`${styles.recomendation} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  )
}

export default OrderDetails
