import React from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './constructor.module.css'

export default function Constructor () {

  return(
    <main className={styles.root}>
      <div className={styles.content}>
        <BurgerIngredients/>
        <BurgerConstructor />
      </div>
    </main>
  )
}
