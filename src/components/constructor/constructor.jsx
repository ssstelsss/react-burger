import React from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Loader from '../loader/loader'
import PropTypes from 'prop-types'
import styles from './constructor.module.css'

export default function Constructor ({ ingredients }) {
  return(
    <main className={styles.root}>
      {ingredients.length
        ? <div className={styles.content}>
            <BurgerIngredients data={ingredients}/>
            <BurgerConstructor data={ingredients}/>
          </div>
        : <Loader/>
      }
      
    </main>
  )
}

Constructor.defaultProps = {
  ingredients: []
}

Constructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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
  }))
}
