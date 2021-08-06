import React, { useState, useMemo, useRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCategory from '../ingredient-category/ingredient-category'
import { useSelector } from 'react-redux'
import styles from './burger-ingredients.module.css'

const tabs = ['Булки', 'Соусы', 'Начинки']

export default function BurgerIngredients () {
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const data = useSelector(store => store.ingredients.items)

  const rootRef = useRef()
  const bunsRef = useRef()
  const sauceRef = useRef()
  const mainRef = useRef()
  
  const bunsData = useMemo(() => data.filter(el => el.type === 'bun'), [data])
  const sauceData = useMemo(() => data.filter(el => el.type === 'sauce'), [data])
  const mainData = useMemo(() => data.filter(el => el.type === 'main'), [data])

  function onScroll() {
    const rootTop = rootRef.current.getBoundingClientRect().top
    const bunsTop = bunsRef.current.getBoundingClientRect().top
    const souceTop = sauceRef.current.getBoundingClientRect().top
    const mainTop = mainRef.current.getBoundingClientRect().top

    const distToBuns = Math.abs(rootTop - bunsTop)
    const distToSouce = Math.abs(rootTop - souceTop)
    const distToMain = Math.abs(rootTop - mainTop)

    const distances = [distToBuns, distToSouce, distToMain]
    const minElement = Math.min(...distances)
    const minIndex = distances.findIndex(el => el === minElement)
    const newTab = tabs[minIndex]

    if (newTab !== currentTab) {
      setCurrentTab(newTab)
    }
  }

  function scrollToTab (type) {
    setCurrentTab(type)
    switch (type) {
      case 'Булки':
        bunsRef.current.scrollIntoView({behavior: "smooth"})
        break
      case 'Соусы':
        sauceRef.current.scrollIntoView({behavior: "smooth"})
        break
      case 'Начинки':
        mainRef.current.scrollIntoView({behavior: "smooth"})
        break
      default:
        console.error('Wrong tab name!!!')
    }
  }

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
            <Tab key={type} value={type} active={currentTab === type} onClick={(type) => scrollToTab(type)}>
              {type}
            </Tab>
          )
        })}
      </div>

      <div ref={rootRef} onScroll={onScroll} className={`${styles.content} mt-10`}>
        <IngredientCategory ref={bunsRef} data={bunsData} title={'Булки'} />
        <IngredientCategory ref={sauceRef} data={sauceData} title={'Соусы'} />
        <IngredientCategory ref={mainRef} data={mainData} title={'Начинки'} />
      </div>
    </div>
  )
}
