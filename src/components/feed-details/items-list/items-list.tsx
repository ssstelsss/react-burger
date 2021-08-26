import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Item from './item/item'
import styles from './items-list.module.css'

interface IItemsListProps {
  ingredients: string[]
}

const ItemsList: FC<IItemsListProps> = ({ ingredients }) => {
  const allIngredients = useSelector((store: any) => store.ingredients.items)

  const currentIngredients = ingredients.map(el =>
    allIngredients.find((item: any) => item._id === el)
  )

  console.log('currentIngredients: ', currentIngredients)

  const ingredientsGroup: { [key: string]: any } = {}
  currentIngredients.forEach(
    (item: { _id: string; price: number; name: string }) => {
      if (ingredientsGroup[item._id]) {
        ingredientsGroup[item._id].count += 1
      } else {
        ingredientsGroup[item._id] = {
          count: 1,
          ...item,
        }
      }
    }
  )
  console.log('ingredientsGroup: ', ingredientsGroup)
  return (
    <div className={`${styles.root} mt-6`}>
      {Object.keys(ingredientsGroup).map((key: string) => (
        <Item key={ingredientsGroup[key]._id} item={ingredientsGroup[key]} />
      ))}
    </div>
  )
}

export default ItemsList
