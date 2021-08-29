import React from 'react'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './ingredient-category.module.css'
import { IIngredient } from '../../types'

interface IngredientCategoryComponentProps {
  data: IIngredient[]
  title: string
}

const IngredientCategory = React.forwardRef<
  HTMLDivElement,
  IngredientCategoryComponentProps
>(({ data, title }, ref) => {
  return (
    <div className={'pb-10'}>
      <section ref={ref} className={styles.label}>
        <p className='text text_type_main-medium'>{title}</p>
      </section>

      <div className={styles.elements}>
        {data.map(ingredient => (
          <IngredientCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  )
})

export default IngredientCategory
