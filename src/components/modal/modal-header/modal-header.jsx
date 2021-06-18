import React from 'react'
import PropTypes from 'prop-types'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal-header.module.css'

export default function ModalHeader ({ children, onClose }) {

  return(
    <div className={styles.root}>
      <span className='text text_type_main-large'>{children}</span>
      <div onClick={onClose}>
        <CloseIcon type='secondary' />
      </div>
    </div>
  )
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}