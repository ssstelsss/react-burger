import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import ModalHeader from './modal-header/modal-header'
import ModalOverlay from './modal-overlay/modal-overlay'
import styles from './modal.module.css'

const modalRoot = document.getElementById('root-modal') as HTMLElement

interface IModalProps {
  header?: string
  onClose: () => void
}

const Modal: FC<IModalProps> = ({ children, header, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div
          className={`${styles.modal} p-10`}
          onClick={e => e.stopPropagation()}
        >
          <ModalHeader onClose={onClose}>{header}</ModalHeader>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  )
}

export default Modal
