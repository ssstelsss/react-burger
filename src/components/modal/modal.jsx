import React from 'react'
import ReactDOM from 'react-dom'
import ModalHeader from './modal-header/modal-header'
import ModalOverlay from './modal-overlay/modal-overlay'
import PropTypes from 'prop-types'
import styles from './modal.module.css'

const modalRoot = document.getElementById('root-modal')

export default function Modal ({ children, header, onClose }) {
  return ReactDOM.createPortal(
      <>
        <ModalOverlay onClose={onClose}>
          <div className={`${styles.modal} p-10`} onClick={(e) => e.stopPropagation()}>
            <ModalHeader onClose={onClose}>{header}</ModalHeader>
            {children}
          </div>
        </ModalOverlay>
      </>,
      modalRoot
    )
}

Modal.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  onClose: PropTypes.func
}