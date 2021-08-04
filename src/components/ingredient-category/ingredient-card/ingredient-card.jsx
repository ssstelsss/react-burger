import React from 'react'
import PropTypes from 'prop-types'
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentIngredient } from '../../../services/slices/currentIngredientSlice'
import { useDrag } from 'react-dnd'
import styles from './ingredient-card.module.css'

export default function IngredientCard({ ingredient }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [{ opacity }, ref] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const count = useSelector(store => {
    if (ingredient.type === 'bun') {
      return store.burgerConstructor.bun?._id === ingredient._id && 1
    } else {
      return store.burgerConstructor.items.filter(
        item => item._id === ingredient._id
      ).length
    }
  })

  function onSelect() {
    dispatch(setCurrentIngredient(ingredient))
    const location = {
      pathname: `/ingredients/${ingredient._id}`,
      state: { withClick: true }
    }
    history.replace(location)
  }
  return (
    <div
      ref={ref}
      className={`${styles.root} mt-6`}
      onClick={onSelect}
      style={{ opacity }}
    >
      {!!count && (
        <div className={styles.counter}>
          <Counter count={count} size='default' />
        </div>
      )}
      <div className={`${styles.image} ml-4 mr-4`}>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>

      <div className={`${styles.price} mt-1`}>
        <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
        <CurrencyIcon />
      </div>

      <div className={`${styles.label} mt-1`}>
        <p className='text text_type_main-default'>{ingredient.name}</p>
      </div>
    </div>
  )
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
}
