import React from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import data from '../../utils/data'
import selectedData from '../../utils/selected-data'
import styles from './constructor.module.css'

export default function Constructor () {

  return(
    <main className={styles.root}>
      <div className={styles.content}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={selectedData}/>
      </div>
    </main>
  )
}
