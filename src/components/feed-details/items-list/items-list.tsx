import React, { FC } from 'react'
import { useAppSelector } from '../../../services'
import { IIngredient } from '../../../types'
import Item from './item/item'
import styles from './items-list.module.css'

interface IItemsListProps {
  ingredients: string[]
}

export interface IIngredientWithCount extends IIngredient {
  count: number
}

interface IIngredientsGroup {
  [key: string]: IIngredientWithCount
}

const ItemsList: FC<IItemsListProps> = ({ ingredients }) => {
  const allIngredients = useAppSelector(store => store.ingredients.items)

  const currentIngredients = ingredients.map(el =>
    allIngredients.find(item => item._id === el)
  )

  const ingredientsGroup: IIngredientsGroup = {} as IIngredientsGroup
  currentIngredients.forEach(item => {
    if (item?._id) {
      const key = item._id
      if (ingredientsGroup[key]) {
        ingredientsGroup[key].count += 1
      } else {
        ingredientsGroup[key] = {
          count: 1,
          ...item,
        }
      }
    }
  })

  return (
    <div className={`${styles.root} mt-6`}>
      {Object.keys(ingredientsGroup).map((key: string) => (
        <Item key={ingredientsGroup[key]._id} item={ingredientsGroup[key]} />
      ))}
    </div>
  )
}

export default ItemsList
