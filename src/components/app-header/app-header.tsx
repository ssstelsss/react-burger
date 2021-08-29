import React, { FC } from 'react'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, Link } from 'react-router-dom'
import MenuItem from '../menu-item/menu-item'
import styles from './app-header.module.css'

const AppHeader: FC = () => {
  const { pathname } = useLocation()

  return (
    <header className={styles.root}>
      <nav className={`${styles.content}`}>
        <div className={styles.productOptions}>
          <MenuItem
            icon={<BurgerIcon type='secondary' />}
            link={'/'}
            isActive={pathname === '/'}
          >
            Конструктор
          </MenuItem>
          <div className='ml-2'>
            <MenuItem
              icon={<ListIcon type='secondary' />}
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
            icon={<ProfileIcon type='secondary' />}
            link={'/profile'}
            isActive={pathname.includes('/profile')}
          >
            Личный кабинет
          </MenuItem>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
