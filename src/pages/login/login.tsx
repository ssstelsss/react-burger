import React, { useState, useEffect, FC } from 'react'
import {
  Input,
  Logo,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { login } from '../../services/slices/loginSlice'
import { getUserData } from '../../services/slices/getUserDataSlice'
import styles from './login.module.css'
import { useAppDispatch, useAppSelector } from '../../services'

interface IUseHistory {
  from?: {
    pathname: string
  }
}

const Login: FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory<IUseHistory>()

  const { getUserDataRequest } = useAppSelector(store => store.getUserData)
  const user = useAppSelector(store => store.user)

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const from = history.location.state?.from?.pathname

  function onChangeField(event: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event?: React.FormEvent) {
    event?.preventDefault()
    dispatch(login(form))
  }

  if (user.isLogined) {
    return <Redirect to={from || '/'} />
  }

  if (getUserDataRequest) {
    return null
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Logo />
        <form
          className={`${styles.formContainer} mt-20`}
          onSubmit={handleSubmit}
        >
          <p className='text text_type_main-medium'>Вход</p>
          <Input
            type='email'
            placeholder='E-mail'
            name='email'
            value={form.email}
            onChange={onChangeField}
          />
          <PasswordInput
            onChange={onChangeField}
            value={form.password}
            name={'password'}
          />
          <div className='mt-5'>
            <Button type='primary' size='medium' onClick={handleSubmit}>
              Войти
            </Button>
          </div>
        </form>
      </div>
      <div className={`${styles.footer} mt-20`}>
        <p className='text text_type_main-default text_color_inactive'>
          Вы - новый пользователь?{' '}
          <Link to='/register'>Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default text_color_inactive mt-8'>
          Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
