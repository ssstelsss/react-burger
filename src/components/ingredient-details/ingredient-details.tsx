import React, { FC } from 'react'
import Detail from './detail/detail'
import styles from './ingredient-details.module.css'
import { IIngredient } from '../../types'

interface IIngredientDetailsProps {
  ingredient: IIngredient
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({ ingredient }) => {
  return (
    <div className={`${styles.root} pb-5`}>
      <div className={`${styles.image}`}>
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>
      <span className={'text text_type_main-medium mt-4'}>
        {ingredient.name}
      </span>

      <div className={`${styles.details} mt-8`}>
        <Detail title={'Каллории, калл'}>{ingredient.calories}</Detail>
        <Detail title={'Белки, г'}>{ingredient.proteins}</Detail>
        <Detail title={'Жиры, г'}>{ingredient.fat}</Detail>
        <Detail title={'Углеводы, г'}>{ingredient.carbohydrates}</Detail>
      </div>
    </div>
  )
}

export default IngredientDetails
