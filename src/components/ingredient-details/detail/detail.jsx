import React from 'react'
import PropTypes from 'prop-types'
import styles from './detail.module.css'

export default function Detail ({ children, title }) {

  return (
    <div className={styles.root}>
      <span className={'text text_type_main-default text_color_inactive'}>{title}</span>
      <span className={'text text_type_main-default text_color_inactive mt-2'}>{children}</span>
    </div>
  )
}

Detail.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}