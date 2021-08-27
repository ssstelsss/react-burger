import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './profileLink.module.css'

interface IProfileLinkProps {
  to: string
  isActive?: boolean
}

const ProfileLink: FC<IProfileLinkProps> = ({ children, to, isActive }) => {
  return (
    <Link to={to} className={styles.link}>
      <p
        className={`text text_type_main-medium ${
          isActive ? '' : 'text_color_inactive'
        }`}
      >
        {children}
      </p>
    </Link>
  )
}

export default ProfileLink
