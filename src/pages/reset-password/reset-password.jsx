import React, { useEffect, useState } from 'react'
import {
  Input,
  Logo,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom'
import styles from './reset-password.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../services/slices/resetPasswordSlice'

export default function ResetPassword() {
  const dispatch = useDispatch()
  const history = useHistory()
  const resetPasswordSuccess = useSelector(
    store => store.resetPassword.resetPasswordSuccess
  )
  const [form, setForm] = useState({
    token: '',
    password: '',
  })

  useEffect(() => {
    resetPasswordSuccess && history.replace('/login')
  }, [resetPasswordSuccess, history])

  function onChangeField(event) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
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
          <Button
            className='mt-5'
            type='primary'
            size='medium'
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
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
