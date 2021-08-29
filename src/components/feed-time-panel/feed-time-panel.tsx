import React, { FC } from 'react'
import { useAppSelector } from '../../services'
import styles from './feed-time-panel.module.css'

const FeedTimePanel: FC = () => {
  const feed = useAppSelector(store => store.feed)

  const doneOrders = feed.orders
    .filter(item => item.status === 'done')
    .slice(0, 20)
  const inWorkOrders = feed.orders
    .filter(item => item.status === 'created')
    .slice(0, 20)

  return (
    <div className={styles.ordersTimePanelBlock}>
      <div className={styles.progressBlock}>
        <div className={styles.ready}>
          <span className='text text_type_main-medium'>Готовы:</span>
          <div className={styles.readyNumbers}>
            {doneOrders.map(el => (
              <p key={el._id} className='text text_type_digits-default'>
                {el.number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.inWork}>
          <span className='text text_type_main-medium'>В работе:</span>
          <div className={styles.inWorkNumbers}>
            {inWorkOrders.map(el => (
              <p key={el._id} className='text text_type_digits-default'>
                {el.number}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.allTime}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.code} text text_type_digits-large`}>
          {feed.total}
        </p>
      </div>
      <div className={styles.today}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.code} text text_type_digits-large`}>
          {feed.totalToday}
        </p>
      </div>
    </div>
  )
}

export default FeedTimePanel
