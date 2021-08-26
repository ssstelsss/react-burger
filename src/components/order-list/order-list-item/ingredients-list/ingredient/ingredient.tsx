import React, { FC } from 'react'
import styles from './ingredient.module.css'

type IIngredientProps = {
  ingredient: any
  isLast?: boolean
  restNumber?: number
  style?: any
}

const Ingredient: FC<IIngredientProps> = ({
  ingredient,
  isLast,
  restNumber,
  style,
}) => {
  return (
    <div style={style} className={`${styles.root}`}>
      {isLast && restNumber ? (
        <div className={`${styles.restNumber} text text_type_digits-default`}>
          +{restNumber}
        </div>
      ) : null}
      <div className={`${styles.imageWrapper} ${isLast ? styles.last : ''}`}>
        <img src={ingredient.image_mobile} alt={ingredient.name} />
      </div>
    </div>
  )
}

export default Ingredient
