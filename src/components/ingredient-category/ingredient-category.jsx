import React from 'react'
import PropTypes from 'prop-types'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './ingredient-category.module.css'

export default function IngredientCategory ({ data, titile }) {

  return(
    <div className={`${styles.root} pt-10`}>
      <section className={styles.label}>
        <p className='text text_type_main-medium'>
          {titile}
        </p>
      </section>

      <div className={styles.elements}>
        {data.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
      </div>
    </div>
  )
}

IngredientCategory.propTypes = {
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
  })),
  titile: PropTypes.string
}