import React, { useState, useCallback, useEffect } from 'react'
import {
  Input,
  Logo,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/slices/loginSlice'
import { getUserData } from '../../services/slices/getUserDataSlice'
import styles from './login.module.css'

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isUserLoaded, setUserLoaded] = useState(false)
  const user = useSelector(store => store.user)

  const init = useCallback(async () => {
    dispatch(getUserData())
    setUserLoaded(true)
  }, [dispatch])

  useEffect(() => {
    init()
  }, [init])

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const from = history.location.state?.from?.pathname

  function onChangeField(event) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(login(form))
  }

  if (user.isLogined) {
    return <Redirect to={from || '/'} />
  }

  if (!isUserLoaded) {
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
          <Button
            className='mt-5'
            type='primary'
            size='medium'
            onClick={handleSubmit}
          >
            Войти
          </Button>
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
