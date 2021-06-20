import React from 'react'
import orderCheck from '../../images/orderCheck.gif'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styles from './order-details.module.css'

export default function OrderDetails ({ onConfirm }) {
  const order = useSelector(store => store.order.result)
  return(
    <section className={`${styles.root} pt-8 pb-20`}>
      <span className={`${styles.code} text text_type_digits-large`}>{order.order.number}</span>
      <span className={`${styles.idLabel} text text_type_main-medium`}>идентификатор заказа</span>
      <div className={styles.imgBlock} onClick={onConfirm}>
        <img src={orderCheck} alt='confirm order' />
      </div>
      <span className={`${styles.orderStatus} text text_type_main-default`}>Ваш заказ начали готовить</span>
      <span className={`${styles.recomendation} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
    </section>
  )
}

OrderDetails.propTypes = {
  onConfirm: PropTypes.func
}