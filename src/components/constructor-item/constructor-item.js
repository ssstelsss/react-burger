import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'

export default function ConstructorItem ({type, isLocked, hasIcon, text, price, thumbnail}) {

  return(
    <div className={`${styles.constructorItem} ${!hasIcon && 'ml-6'}`}>
      {hasIcon && <DragIcon/>}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
    </div>
  )
}

ConstructorItem.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  hasIcon: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string
}