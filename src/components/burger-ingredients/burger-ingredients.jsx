import React, { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCategory from '../ingredient-category/ingredient-category'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'

const tabs = ['Булки', 'Соусы', 'Начинки']

export default function BurgerIngredients ({ data }) {

  const [currentTab, setCurrentTab] = useState(tabs[0])

  const bunsData = data.filter(el => el.type === 'bun')
  const sauceData = data.filter(el => el.type === 'sauce')
  const mainData = data.filter(el => el.type === 'main')

  return(
    <div className={`${styles.root} pl-5 pt-10`}>
      <div className={styles.label}>
        <h1 className='text text_type_main-large'>
          Соберите бургер
        </h1>
      </div>

      <div className={`${styles.tabs} mt-5`}>
        {tabs.map(type => {
          return(
            <Tab key={type} value={type} active={currentTab === type} onClick={(type) => setCurrentTab(type)}>
              {type}
            </Tab>
          )
        })}
      </div>

      <div className={`${styles.content} mt-10`}>
        <IngredientCategory data={bunsData} title={'Булки'} />
        <IngredientCategory data={sauceData} title={'Соусы'} />
        <IngredientCategory data={mainData} title={'Начинки'} />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }))
}