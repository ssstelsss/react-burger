import React, { useState } from 'react'
import {
  Input,
  Logo,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect } from 'react-router-dom'
import { registration } from '../../services/slices/registrationSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './register.module.css'

export default function Register() {
  const dispatch = useDispatch()
  const isRegistrationSuccess = useSelector(
    store => store.registration.registrationSuccess
  )
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  function onChangeField(event) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(registration(form))
  }

  if (isRegistrationSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Logo />
        <form
          className={`${styles.formContainer} mt-20`}
          onSubmit={handleSubmit}
        >
          <p className='text text_type_main-medium mt-20'>Регистрация</p>
          <Input
            type='text'
            placeholder='Имя'
            name='name'
            value={form.name}
            onChange={onChangeField}
          />
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
            Зарегистрироваться
          </Button>
        </form>
      </div>

      <div className={`${styles.footer} mt-20`}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы? <Link to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  )
}
