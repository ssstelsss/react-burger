import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useAppSelector } from '../../services'

const Ingredients: FC = () => {
  const params = useParams<{ id: string }>()
  const ingredients = useAppSelector(store => store.ingredients.items)
  const ingredient = ingredients.find(el => el._id === params.id)

  return <>{ingredient && <IngredientDetails ingredient={ingredient} />}</>
}

export default Ingredients
