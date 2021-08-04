import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './menu-item.module.css'

export default function MenuItem({ isActive, icon, link, children }) {
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

MenuItem.defaultProps = {
  isActive: false,
  link: '#',
}

MenuItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}
