import React, { FC } from 'react'
import { MESSAGES } from '../../utils/errors'
import styles from './error.module.css'

interface IErrorProps {
  code: string
}

const Error: FC<IErrorProps> = ({ code }) => {
  return (
    <div className={styles.root}>
      <h2 className={'text text_type_main-medium'}>{MESSAGES[code]}</h2>
    </div>
  )
}

export default Error
