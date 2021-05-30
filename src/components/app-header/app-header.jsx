import React, { useState } from 'react'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import MenuItem from '../menu-item/menu-item'
import styles from './app-header.module.css'

const ITEMS = {
  constructor: 'constructor',
  orders: 'orders',
  profile: 'profile'
}

export default function AppHeader () {

  const [activeItem, setActiveItem] = useState(ITEMS.constructor)


  return(
    <header className={styles.root}>
      <div className={`${styles.content}`}>
        <div className={styles.productOptions}>
          <MenuItem icon={<BurgerIcon/>} isActive={activeItem === ITEMS.constructor} onClick={() => setActiveItem(ITEMS.constructor)}>
            Конструктор
          </MenuItem>
          <div className='ml-2'>
            <MenuItem icon={<ListIcon/>} isActive={activeItem === ITEMS.orders } onClick={() => setActiveItem(ITEMS.orders)}>
              Лента заказов
            </MenuItem>
          </div>
        </div>

        <div className={styles.logo}>
          <Logo/>
        </div>
        
        <div className={styles.profileOptions}>
          <MenuItem icon={<ProfileIcon/>} isActive={activeItem === ITEMS.profile} onClick={() => setActiveItem(ITEMS.profile)}>
            Личный кабинет
          </MenuItem>
        </div>
      
      </div>
    </header>
  )
}