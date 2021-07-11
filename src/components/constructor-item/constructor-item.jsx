import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { swapItems } from '../../services/slices/burgerConstructorSlice'
import { useDrag, useDrop } from 'react-dnd'
import styles from './constructor-item.module.css'

export default function ConstructorItem ({type, isLocked, isDraggable, text, price, thumbnail, index, handleClose}) {
  const ref = useRef()
  const dispatch = useDispatch()

  const [, drop] = useDrop({
    accept: 'constructorIngredients',
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        dispatch(swapItems([dragIndex, hoverIndex]))
        item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
      type: 'constructorIngredients',
      item: { index },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
  });

  const opacity = isDragging ? 0.5 : 1;

  isDraggable && drag(drop(ref));

  return(
    <div ref={ref} className={`${styles.constructorItem} ${!isDraggable ? 'ml-6' : styles.draggable}`} style={{opacity}}>
      {isDraggable && <DragIcon/>}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleClose}
      />
    </div>
  )
}

ConstructorItem.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  isDraggable: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  index: PropTypes.number,
  handleClose: PropTypes.func
}