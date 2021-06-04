import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css'

export default function IngredientCard ({ ingredient, count, onSelect }) {

  return(
    <div className={`${styles.root} mt-6`} onClick={() => onSelect(ingredient)}>
      {count &&
        <div className={styles.counter}>
          <Counter count={count} size='default' />
        </div>
      }
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
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  }),
  count: PropTypes.number,
  onSelect: PropTypes.func
}
