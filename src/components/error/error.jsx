import React from 'react'
import { MESSAGES } from '../../utils/errors'
import PropTypes from 'prop-types'
import styles from './error.module.css'

export default function Error ({ code }) {

  return (
    <div className={styles.root}>
      <h2 className={'text text_type_main-medium'}>{MESSAGES[code]}</h2>
    </div>
  )
}

Error.propTypes = {
  code: PropTypes.string
}