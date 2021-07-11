import React from 'react'
import PropTypes from 'prop-types'
import styles from './placeholder.module.css'

export default function Placeholder ({ isFieldHover }) {

  const style = {
    border: `3px dashed ${isFieldHover ? 'rgba(51, 51, 255, 0.7)' : '#2f2f37'}`
  }
  return(
    <div className={`${styles.root}`} style={style}>
      <p className={`${isFieldHover ? styles.textShadow : ''} text text_type_main-medium`}>
        { isFieldHover
            ? 'Положите ингредиент'
            : 'Перетащите ингредиент'
        }
      </p>
    </div>
  )
}

Placeholder.propTypes = {
  isFieldHover: PropTypes.bool
}