import React from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import styles from './constructor.module.css'

export default function Constructor() {
  return (
    <main className={styles.root}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>
    </main>
  )
}
