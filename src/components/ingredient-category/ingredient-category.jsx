import React from 'react'
import PropTypes from 'prop-types'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './ingredient-category.module.css'

function IngredientCategoryComponent({ data, title }, ref) {
  return (
    <div className={'pb-10'}>
      <section ref={ref} className={styles.label}>
        <p className='text text_type_main-medium'>{title}</p>
      </section>

      <div className={styles.elements}>
        {data.map(ingredient => (
          <IngredientCard
            key={ingredient._id}
            ingredient={ingredient}
            count={1}
          />
        ))}
      </div>
    </div>
  )
}

const IngredientCategory = React.forwardRef(IngredientCategoryComponent)

IngredientCategory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
    })
  ),
  titile: PropTypes.string,
}

export default IngredientCategory
