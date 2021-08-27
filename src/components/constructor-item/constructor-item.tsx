import React, { FC, useRef } from 'react'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { swapItems } from '../../services/slices/burgerConstructorSlice'
import { useDrag, useDrop, XYCoord } from 'react-dnd'
import styles from './constructor-item.module.css'

interface IConstructorItemProps {
  text: string
  price: number
  thumbnail: string
  type?: 'top' | 'bottom'
  isLocked?: boolean
  isDraggable?: boolean
  index?: number
  handleClose?: () => void
}

const ConstructorItem: FC<IConstructorItemProps> = ({
  type,
  isLocked,
  isDraggable,
  text,
  price,
  thumbnail,
  index,
  handleClose,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const [, drop] = useDrop({
    accept: 'constructorIngredients',
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index as number
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset() as XYCoord
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(swapItems([dragIndex, hoverIndex]))
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredients',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.5 : 1

  isDraggable && drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`${styles.constructorItem} ${
        !isDraggable ? 'ml-6' : styles.draggable
      }`}
      style={{ opacity }}
    >
      {isDraggable && <DragIcon type='primary' />}
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

export default ConstructorItem
