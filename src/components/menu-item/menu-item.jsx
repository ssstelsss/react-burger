import React from 'react'
import PropTypes from 'prop-types'
import styles from './menu-item.module.css'

export default function MenuItem ({ isActive, icon, link, children, onClick }) {
  const Icon = React.cloneElement(icon, {
    type: isActive ? 'primary' : 'secondary'
  })

  return(
    <a className={styles.root} href={link} onClick={onClick}>
      {Icon}
      <p className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
        {children}
      </p>
    </a>
  )
}

MenuItem.defaultProps = {
  isActive: false,
  link: '#'
}

MenuItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}