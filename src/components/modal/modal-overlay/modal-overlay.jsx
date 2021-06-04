import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

export default function ModalOverlay ({ children, onClose }) {
  const handleClose = useCallback((e) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleClose)
    return () => document.removeEventListener('keydown', handleClose)
  }, [handleClose])

  

  return(
    <div className={styles.root} onClick={onClose}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}