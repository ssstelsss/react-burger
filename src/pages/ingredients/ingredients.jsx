import React from 'react'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useSelector } from 'react-redux'

export default function Ingredients() {
  const params = useParams()
  const ingredients = useSelector(store => store.ingredients.items)
  const ingredient = ingredients.find(el => el._id === params.id)

  return (
    <>
      {ingredient && (
        <IngredientDetails ingredient={ingredient} />
      )}
    </>
  )
}
