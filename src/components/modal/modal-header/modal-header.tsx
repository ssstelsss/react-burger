import React, { FC } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal-header.module.css'

interface IModalHeaderProps {
  onClose: () => void
}

const ModalHeader: FC<IModalHeaderProps> = ({ children, onClose }) => {
  return (
    <div className={styles.root}>
      <span className='text text_type_main-large'>{children}</span>
      <div className={styles.closeIcon} onClick={onClose}>
        <CloseIcon type='secondary' />
      </div>
    </div>
  )
}

export default ModalHeader
