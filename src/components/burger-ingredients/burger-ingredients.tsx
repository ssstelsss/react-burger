import React, { useState, useMemo, useRef, FC } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCategory from '../ingredient-category/ingredient-category'
import styles from './burger-ingredients.module.css'
import { useAppSelector } from '../../services'

type TTabs = 'Булки' | 'Соусы' | 'Начинки'

const tabs: TTabs[] = ['Булки', 'Соусы', 'Начинки']

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const data = useAppSelector(store => store.ingredients.items)

  const rootRef = useRef<HTMLDivElement>(null)
  const bunsRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const bunsData = useMemo(() => data.filter(el => el.type === 'bun'), [data])
  const sauceData = useMemo(
    () => data.filter(el => el.type === 'sauce'),
    [data]
  )
  const mainData = useMemo(() => data.filter(el => el.type === 'main'), [data])

  function onScroll() {
    const rootTop = rootRef.current?.getBoundingClientRect().top || 0
    const bunsTop = bunsRef.current?.getBoundingClientRect().top || 0
    const souceTop = sauceRef.current?.getBoundingClientRect().top || 0
    const mainTop = mainRef.current?.getBoundingClientRect().top || 0

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

  function scrollToTab(type: TTabs) {
    setCurrentTab(type)
    switch (type) {
      case 'Булки':
        bunsRef.current?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Соусы':
        sauceRef.current?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Начинки':
        mainRef.current?.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        console.error('Wrong tab name!!!')
    }
  }

  return (
    <div className={`${styles.root} pl-5 pt-10`}>
      <div className={styles.label}>
        <h1 className='text text_type_main-large'>Соберите бургер</h1>
      </div>

      <div className={`${styles.tabs} mt-5`}>
        {tabs.map(type => {
          return (
            <Tab
              key={type}
              value={type}
              active={currentTab === type}
              onClick={type => scrollToTab(type as TTabs)}
            >
              {type}
            </Tab>
          )
        })}
      </div>

      <div
        ref={rootRef}
        onScroll={onScroll}
        className={`${styles.content} mt-10`}
      >
        <IngredientCategory ref={bunsRef} data={bunsData} title={'Булки'} />
        <IngredientCategory ref={sauceRef} data={sauceData} title={'Соусы'} />
        <IngredientCategory ref={mainRef} data={mainData} title={'Начинки'} />
      </div>
    </div>
  )
}

export default BurgerIngredients
