import React from 'react'
import PropTypes from 'prop-types'
import data from '../../utils/data'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './ingredient-category.module.css'

const INGEDIENT_TYPES = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
}

export default function IngredientCategory ({ type }) {

  const ingredients = data.filter(el => el.type === type)

  return(
    <div className={`${styles.root} pt-10`}>
      <section className={styles.label}>
        <p className='text text_type_main-medium'>
          {INGEDIENT_TYPES[type]}
        </p>
      </section>

      <div className={styles.elements}>
        {ingredients.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
      </div>
    </div>
  )
}

IngredientCategory.propTypes = {
  type: PropTypes.string
}