import React, { FC, useEffect, useState } from 'react'
import {
  Input,
  Logo,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom'
import styles from './reset-password.module.css'
import { resetPassword } from '../../services/slices/resetPasswordSlice'
import { useAppDispatch, useAppSelector } from '../../services'

const ResetPassword: FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory<{ fromForgotPassword?: boolean }>()
  const resetPasswordSuccess = useAppSelector(
    store => store.resetPassword.resetPasswordSuccess
  )
  const [form, setForm] = useState({
    token: '',
    password: '',
  })

  useEffect(() => {
    resetPasswordSuccess && history.replace('/login')
  }, [resetPasswordSuccess, history])

  function onChangeField(event: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    dispatch(resetPassword(form))
  }

  if (!history.location.state?.fromForgotPassword) {
    history.replace('/login')
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
          <PasswordInput
            onChange={onChangeField}
            value={form.password}
            name={'password'}
          />
          <Input
            type='text'
            placeholder='Введите код из письма'
            name='token'
            value={form.token}
            onChange={onChangeField}
          />
          <div className='mt-5'>
            <Button type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
      <div className={`${styles.footer} mt-20`}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль? <Link to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
