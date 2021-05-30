import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css'

export default function IngredientCard ({ ingredient }) {

  return(
    <div className={`${styles.root} mt-6`}>
      <div className={`${styles.image} ml-4 mr-4`}>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>

      <div className={`${styles.price} mt-1`}>
        <p className='text text_type_digits-default mr-2'>
          {ingredient.price}
        </p>
        <CurrencyIcon />
      </div>

      <div className={`${styles.label} mt-1`}>
        <p className='text text_type_main-default'>
          {ingredient.name}
        </p>
      </div>
    </div>
  )
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
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
  })
}
