import React, { FC, useLayoutEffect, useState } from 'react'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './main.module.css'
import { getUserData } from '../../../services/slices/getUserDataSlice'
import { updateUserData } from '../../../services/slices/updateUserDataSlice'
import { useAppDispatch, useAppSelector } from '../../../services'

interface IdisabledButtons {
  name: boolean
  email: boolean
  password: boolean
}

const Main: FC = () => {
  const dispatch = useAppDispatch()
  const { name, email } = useAppSelector(store => store.user)
  const [form, setForm] = useState({
    name,
    email,
    password: '',
  })
  const [disabledButtons, setDisabledButtons] = useState<IdisabledButtons>({
    name: true,
    email: true,
    password: true,
  })

  useLayoutEffect(() => {
    dispatch(getUserData)
  }, [dispatch])

  function onChangeField(event: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function onToggleActive(name: keyof IdisabledButtons) {
    setDisabledButtons(prev => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    dispatch(updateUserData(form))
  }

  function reset() {
    setDisabledButtons({ name: true, email: true, password: true })
    setForm(prev => ({ name, email, password: '' }))
  }

  return (
    <div className={styles.root}>
      <form className={styles.content} onSubmit={handleSubmit}>
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
          <div className={`${styles.actions} mt-5`}>
            <Button type='secondary' size='medium' onClick={reset}>
              Отмена
            </Button>
            <Button type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  )
}

export default Main
