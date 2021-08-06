import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './profileLink.module.css'

export default function ProfileLink({ children, to, isActive }) {
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

ProfileLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  isActive: PropTypes.bool,
}
