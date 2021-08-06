import React from 'react'
import styles from './loader.module.css'

export default function Loader() {
  return (
    <div className={styles.root}>
      <div className={styles.loader}></div>
    </div>
  )
}
