import React, { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styles from './menu-item.module.css'

interface IMenuItemProps {
  isActive?: boolean
  icon: ReactElement
  link: string
}

const MenuItem: FC<IMenuItemProps> = ({ isActive, icon, link, children }) => {
  const Icon = React.cloneElement(icon, {
    type: isActive ? 'primary' : 'secondary',
  })

  return (
    <Link to={link} className={styles.root}>
      {Icon}
      <p
        className={`text text_type_main-default ml-2 ${
          isActive ? '' : 'text_color_inactive'
        }`}
      >
        {children}
      </p>
    </Link>
  )
}

export default MenuItem
