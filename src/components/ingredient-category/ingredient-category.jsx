import React from 'react'
import PropTypes from 'prop-types'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './ingredient-category.module.css'

export default function IngredientCategory ({ data, title }) {

  return(
    <div className={'pb-10'}>
      <section className={styles.label}>
        <p className='text text_type_main-medium'>
          {title}
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
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  })),
  titile: PropTypes.string
}