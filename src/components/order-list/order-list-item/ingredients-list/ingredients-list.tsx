import React, { FC } from 'react'
import { useAppSelector } from '../../../../services'
import { IIngredient } from '../../../../types'
import Ingredient from './ingredient/ingredient'
import styles from './ingredients-list.module.css'

interface IIngredientsListProps {
  ingredients: string[]
}

const IngredientsList: FC<IIngredientsListProps> = ({ ingredients }) => {
  const allIngredients = useAppSelector(store => store.ingredients.items)

  const currentIngredients = ingredients.map(
    el => allIngredients.find(item => item._id === el) as IIngredient
  )

  const headItems = currentIngredients.slice(0, 5)
  const tailItems = currentIngredients.slice(5, currentIngredients.length - 1)

  return (
    <div className={styles.root}>
      {headItems.map((ingredient, index) => (
        <Ingredient
          key={index}
          style={{ zIndex: 10 - index }}
          ingredient={ingredient}
        />
      ))}
      {tailItems.length ? (
        <Ingredient
          ingredient={tailItems[0]}
          isLast
          restNumber={tailItems.length}
        />
      ) : null}
    </div>
  )
}

export default IngredientsList
