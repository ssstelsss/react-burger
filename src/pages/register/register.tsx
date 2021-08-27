import React, { FC, useState } from 'react'
import {
  Input,
  Logo,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect } from 'react-router-dom'
import { registration } from '../../services/slices/registrationSlice'
import styles from './register.module.css'
import { useAppDispatch, useAppSelector } from '../../services'

const Register: FC = () => {
  const dispatch = useAppDispatch()
  const isRegistrationSuccess = useAppSelector(
    store => store.registration.registrationSuccess
  )
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  function onChangeField(event: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event?: React.FormEvent) {
    event?.preventDefault()
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
          <div className='mt-5'>
            <Button type='primary' size='medium' onClick={handleSubmit}>
              Зарегистрироваться
            </Button>
          </div>
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

export default Register
