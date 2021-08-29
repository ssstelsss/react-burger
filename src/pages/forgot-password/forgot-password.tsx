import React, { FC, useEffect, useState } from 'react'
import {
  Input,
  Logo,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom'
import styles from './forgot-password.module.css'
import { forgotPassword } from '../../services/slices/forgotPasswordSlice'
import { useAppDispatch, useAppSelector } from '../../services'

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch()
  const forgotPasswordSuccess = useAppSelector(
    store => store.forgotPassword.forgotPasswordSuccess
  )
  const history = useHistory()
  const [email, setEmail] = useState('')

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
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

  function handleSubmit(event: React.FormEvent) {
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
          <div className='mt-5'>
            <Button type='primary' size='medium'>
              Восстановить
            </Button>
          </div>
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

export default ForgotPassword
