import React from 'react'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, Link } from 'react-router-dom'
import MenuItem from '../menu-item/menu-item'
import styles from './app-header.module.css'

export default function AppHeader() {
  const { pathname } = useLocation()

  return (
    <header className={styles.root}>
      <nav className={`${styles.content}`}>
        <div className={styles.productOptions}>
          <MenuItem
            icon={<BurgerIcon />}
            link={'/'}
            isActive={pathname === '/'}
          >
            Конструктор
          </MenuItem>
          <div className='ml-2'>
            <MenuItem
              icon={<ListIcon />}
              link={'/feed'}
              isActive={pathname === '/feed'}
            >
              Лента заказов
            </MenuItem>
          </div>
        </div>

        <div className={styles.logo}>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>

        <div className={styles.profileOptions}>
          <MenuItem
            icon={<ProfileIcon />}
            link={'/profile'}
            isActive={pathname === '/profile'}
          >
            Личный кабинет
          </MenuItem>
        </div>
      </nav>
    </header>
  )
}
