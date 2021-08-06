import React, { useLayoutEffect, useState } from 'react'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import styles from './main.module.css'
import { getUserData } from '../../../services/slices/getUserDataSlice'
import { updateUserData } from '../../../services/slices/updateUserDataSlice'

export default function Main() {
  const dispatch = useDispatch()
  const { name, email } = useSelector(store => store.user)
  const [form, setForm] = useState({
    name,
    email,
    password: '',
  })
  const [disabledButtons, setDisabledButtons] = useState({
    name: true,
    email: true,
    password: true,
  })

  useLayoutEffect(() => {
    dispatch(getUserData)
  }, [dispatch])

  function onChangeField(event) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function onToggleActive(name) {
    setDisabledButtons(prev => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  function save(event) {
    event.preventDefault()
    dispatch(updateUserData(form))
  }

  function reset(event) {
    event.preventDefault()
    setDisabledButtons({ name: true, email: true, password: true })
    setForm(prev => ({ name, email, password: '' }))
  }

  return (
    <div className={styles.root}>
      <form className={styles.content}>
        <Input
          type='text'
          placeholder='Имя'
          name='name'
          disabled={disabledButtons.name}
          value={form.name}
          icon={disabledButtons.name ? 'EditIcon' : 'CloseIcon'}
          onChange={onChangeField}
          onIconClick={() => onToggleActive('name')}
        />
        <Input
          type='email'
          placeholder='Логин'
          name='email'
          disabled={disabledButtons.email}
          value={form.email}
          icon={disabledButtons.email ? 'EditIcon' : 'CloseIcon'}
          onChange={onChangeField}
          onIconClick={() => onToggleActive('email')}
        />
        <Input
          type='password'
          placeholder='Пароль'
          name='password'
          disabled={disabledButtons.password}
          value={form.password}
          icon={disabledButtons.password ? 'EditIcon' : 'CloseIcon'}
          onChange={onChangeField}
          onIconClick={() => onToggleActive('password')}
        />
        {Object.values(disabledButtons).some(el => !el) ? (
          <div className={`${styles.actions}`}>
            <Button
              className='mt-5'
              type='secondary'
              size='medium'
              onClick={reset}
            >
              Отмена
            </Button>
            <Button
              className='mt-5'
              type='primary'
              size='medium'
              onClick={save}
            >
              Сохранить
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  )
}
