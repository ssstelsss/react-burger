import React, { FC } from 'react'
import styles from './placeholder.module.css'

interface IPlaceholderProps {
  isFieldHover?: boolean
}

const Placeholder: FC<IPlaceholderProps> = ({ isFieldHover }) => {
  const style = {
    border: `3px dashed ${isFieldHover ? 'rgba(51, 51, 255, 0.7)' : '#2f2f37'}`,
  }
  return (
    <div className={`${styles.root}`} style={style}>
      <p
        className={`${
          isFieldHover ? styles.textShadow : ''
        } text text_type_main-medium`}
      >
        {isFieldHover ? 'Положите ингредиент' : 'Перетащите ингредиент'}
      </p>
    </div>
  )
}

export default Placeholder
