import React from 'react'
import PropTypes from 'prop-types'
import styles from './menu-item.module.css'

export default function MenuItem ({ isActive, icon, children, onClick }) {
  const Icon = React.cloneElement(icon, {
    type: isActive ? 'primary' : 'secondary'
  })

  return(
    <div className={styles.root} onClick={onClick}>
      {Icon}
      <p className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
        {children}
      </p>
    </div>
  )
}

MenuItem.defaultProps = {
  isActive: false
}

MenuItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}