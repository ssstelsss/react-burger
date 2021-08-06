import React from 'react'
import { Link } from 'react-router-dom'

import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.root}>
      <h1>Ой! 404 Error</h1>
      <p>Запрошенная страница не существует</p>
      <br />
      <br />
      <p>
        проверьте адресс или вернитесь на <Link to='/'>домашнюю страницу</Link>
      </p>
    </div>
  )
}
