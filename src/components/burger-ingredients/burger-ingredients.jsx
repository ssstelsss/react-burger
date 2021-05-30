import React, { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCategory from '../ingredient-category/ingredient-category'
import styles from './burger-ingredients.module.css'

const INGEDIENT_TYPES = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
}

const INGEDIENT_TYPES_REFLECT = {
  'Булки': 'bun',
  'Соусы': 'sauce',
  'Начинки': 'main'
}

export default function BurgerIngredients () {

  const [tab, setTab] = useState('bun')

  return(
    <div className={`${styles.root} pl-5 pt-10`}>
      <div className={styles.label}>
        <p className='text text_type_main-large'>
          Соберите бургер
        </p>
      </div>

      <div className={`${styles.tabs} mt-5`}>
        {Object.keys(INGEDIENT_TYPES).map(type => {
          const value = INGEDIENT_TYPES[type]
          return(
            <Tab key={type} value={value} active={INGEDIENT_TYPES[tab] === value} onClick={(value) => setTab(INGEDIENT_TYPES_REFLECT[value])}>
              {value}
            </Tab>
          )
        })}
      </div>

      <div className={`${styles.content} mt-10`}>
        <IngredientCategory type='bun'/>
        <IngredientCategory type='sauce'/>
        <IngredientCategory type='main'/>
      </div>
    </div>
  )
}