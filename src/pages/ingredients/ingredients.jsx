import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Constructor from '../../components/constructor/constructor'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentIngredient,
  removeCurrentIngredient,
} from '../../services/slices/currentIngredientSlice'

export default function Ingredients() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const currentIngredient = useSelector(store => store.currentIngredient)
  const ingredients = useSelector(store => store.ingredients.items)

  const withClick = history.location.state?.withClick

  useEffect(() => {
    return dispatch(removeCurrentIngredient())
  }, [dispatch])

  if (!withClick) {
    const ingredient = ingredients.find(el => el._id === params.id)
    dispatch(setCurrentIngredient(ingredient))
  }

  return (
    <>
      {withClick ? (
        <Constructor />
      ) : (
        currentIngredient && (
          <IngredientDetails ingredient={currentIngredient} />
        )
      )}
    </>
  )
}
