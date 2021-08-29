import React, { FC } from 'react'
import styles from './detail.module.css'

interface IDetailProps {
  title: string
}

const Detail: FC<IDetailProps> = ({ children, title }) => {
  return (
    <div className={styles.root}>
      <span className={'text text_type_main-default text_color_inactive'}>
        {title}
      </span>
      <span className={'text text_type_main-default text_color_inactive mt-2'}>
        {children}
      </span>
    </div>
  )
}

export default Detail
