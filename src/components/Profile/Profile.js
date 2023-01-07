import { Redirect, withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import React, { useContext, useEffect } from 'react'

import { BlogService } from '../../context'
import { fetchUserUpdate } from '../../redux/actions'

import classes from './Profile.module.scss'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const BlogApiService = useContext(BlogService)

  const {
    register,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
    },
  })

  const onSubmit = (data) => {
    const userObject = {
      username: data.username,
      email: data.email,
      password: data.password,
      image: data.image,
    }
    dispatch(fetchUserUpdate(BlogApiService, userObject, user.token))
  }

  useEffect(() => {
    if (user.error) {
      if (user.error.errors.email)
        setError('email', { type: 'validate', message: 'Email address is already taken!' }, { shouldFocus: true })
      if (user.error.errors.username)
        setError('username', { type: 'validate', message: 'Username is already taken!' }, { shouldFocus: true })
    }
  }, [user.error])

  if (!user?.token) return <Redirect to="/sign-in" />

  return (
    <div className={classes['signup-layout']}>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes['form__header']}>Edit Profile</h1>
        <div className={classes['form__input-fields']}>
          <label className={classes['form__label']}>
            Username
            <input
              className={classes['form__input']}
              aria-invalid={errors.username ? 'true' : 'false'}
              {...register('username', {
                required: 'The field is required.',
                validate: (value) => {
                  if (user.error) {
                    if (user.error.errors.username && user.username === value) {
                      return 'Username is already taken.'
                    }
                  }
                  return true
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message:
                    'You can use only lowercase English letters and numbers and you can not use a digit as the first character.',
                },
                minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
                maxLength: { value: 20, message: 'Your username must consist of a maximum of 20 characters.' },
              })}
              placeholder="Username"
              autoFocus
            />
          </label>
          {errors?.username && (
            <p className={classes['form__errors']} role="alert">
              {errors.username?.message}
            </p>
          )}
          <label className={classes['form__label']}>
            Email address
            <input
              className={classes['form__input']}
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: 'The field is required.',
                validate: (value) => {
                  if (user.error) {
                    if (user.error.errors.email && user.email === value) {
                      return 'Email address is already taken.'
                    }
                  }
                  return true
                },
                pattern: {
                  value: /^\w+[\w.+-]*@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/,
                  message: 'You must enter a valid email address.',
                },
              })}
              placeholder="Email address"
            />
          </label>
          {errors?.email && (
            <p className={classes['form__errors']} role="alert">
              {errors.email?.message}
            </p>
          )}
          <label className={classes['form__label']}>
            New password
            <input
              className={classes['form__input']}
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: 'The field is required.',
                minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
                maxLength: { value: 40, message: 'Your password must consist of a maximum of 40 characters.' },
              })}
              type="password"
              placeholder="New password"
            />
          </label>
          {errors?.password && (
            <p className={classes['form__errors']} role="alert">
              {errors.password?.message}
            </p>
          )}
          <label className={classes['form__label']}>
            Avatar image (url)
            <input
              className={classes['form__input']}
              aria-invalid={errors.image ? 'true' : 'false'}
              {...register('image', {
                required: 'The field is required.',
                pattern: {
                  value:
                    /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                  message: 'You must enter a valid URL.',
                },
              })}
              placeholder="Avatar image"
            />
          </label>
          {errors?.image && (
            <p className={classes['form__errors']} role="alert">
              {errors.image?.message}
            </p>
          )}
        </div>
        <div className={classes['form__submit-fields']}>
          <input className={classes['form__submit']} type="submit" value="Save" disabled={!isValid} />
        </div>
      </form>
    </div>
  )
}

export default withRouter(Profile)
