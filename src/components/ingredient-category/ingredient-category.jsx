import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IngredientCard from './ingredient-card/ingredient-card'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import styles from './ingredient-category.module.css'

export default function IngredientCategory ({ data, title }) {
  const [currentIngredient, setCurrentIngredient] = useState()

  return(
    <div className={'pb-10'}>
      <section className={styles.label}>
        <p className='text text_type_main-medium'>
          {title}
        </p>
      </section>

      <div className={styles.elements}>
        {data.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} count={1} onSelect={setCurrentIngredient} />)}
      </div>
      {currentIngredient && 
        <Modal header={'Детали ингредиента'} onClose={() => setCurrentIngredient()}>
          <IngredientDetails ingredient={currentIngredient}/>
        </Modal>
      }
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