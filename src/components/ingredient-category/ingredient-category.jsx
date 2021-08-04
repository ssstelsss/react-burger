import React from 'react'
import PropTypes from 'prop-types'
import IngredientCard from './ingredient-card/ingredient-card'
import Modal from '../modal/modal'
import { useHistory } from 'react-router-dom'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useSelector, useDispatch } from 'react-redux'
import { removeCurrentIngredient } from '../../services/slices/currentIngredientSlice'
import styles from './ingredient-category.module.css'

function IngredientCategoryComponent({ data, title }, ref) {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentIngredient = useSelector(store => store.currentIngredient)

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
      {currentIngredient && (
        <Modal
          header={'Детали ингредиента'}
          onClose={() => {
            dispatch(removeCurrentIngredient())
            history.location.pathname !== '/' &&
              history.replace({ pathname: '/' })
          }}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
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
