import React, { useEffect, useState } from 'react'
import {
  Input,
  Logo,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom'
import styles from './forgot-password.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../services/slices/forgotPasswordSlice'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const forgotPasswordSuccess = useSelector(
    store => store.forgotPassword.forgotPasswordSuccess
  )
  const history = useHistory()
  const [email, setEmail] = useState('')

  function onChangeEmail(event) {
    setEmail(event.target.value)
  }

  useEffect(() => {
    if (forgotPasswordSuccess && email) {
      const location = {
        pathname: '/reset-password',
        state: { fromForgotPassword: true },
      }
      history.replace(location)
    }
  }, [forgotPasswordSuccess, history, email])

  function handleSubmit(event) {
    event.preventDefault()
    if (email) {
      dispatch(forgotPassword({ email }))
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Logo />
        <form
          className={`${styles.formContainer} mt-20`}
          onSubmit={handleSubmit}
        >
          <p className='text text_type_main-medium'>Восстановление пароля</p>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            name='email'
            value={email}
            onChange={onChangeEmail}
          />
          <Button
            className='mt-5'
            type='primary'
            size='medium'
            onClick={handleSubmit}
          >
            Восстановить
          </Button>
        </form>
        <div className={`${styles.footer} mt-20`}>
          <p className='text text_type_main-default text_color_inactive'>
            Вспомнили пароль? <Link to='/login'>Войти</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
