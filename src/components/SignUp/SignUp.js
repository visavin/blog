import { Link, withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'

import { BlogService } from '../../context'
import { fetchUserImage, fetchUserRegister } from '../../redux/actions'

import classes from './SignUp.module.scss'

const SignUp = ({ history }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const BlogApiService = useContext(BlogService)

  const {
    register,
    setError,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'all' })

  const onSubmit = (data) => {
    const userObject = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    dispatch(fetchUserRegister(BlogApiService, userObject))
  }

  useEffect(() => {
    if (user.error) {
      if (user.error.errors.email)
        setError('email', { type: 'validate', message: 'Email address is already taken!' }, { shouldFocus: true })
      if (user.error.errors.username)
        setError('username', { type: 'validate', message: 'Username is already taken!' }, { shouldFocus: true })
    }
  }, [user.error])

  useEffect(() => {
    if (user.token) {
      dispatch(fetchUserImage(BlogApiService, user.username))
    }
  }, [user.token])

  useEffect(() => {
    if (user.image) {
      window.localStorage.setItem('userBlogData', JSON.stringify({ user }))
      history.push('/')
    }
  }, [user.image])

  return (
    <div className={classes['signup-layout']}>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes['form__header']}>Create new account</h1>
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
            Password
            <input
              className={classes['form__input']}
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: 'The field is required.',
                minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
                maxLength: { value: 40, message: 'Your password must consist of a maximum of 40 characters.' },
              })}
              type="password"
              placeholder="Password"
            />
          </label>
          {errors?.password && (
            <p className={classes['form__errors']} role="alert">
              {errors.password?.message}
            </p>
          )}
          <label className={classes['form__label']}>
            Repeat Password
            <input
              className={classes['form__input']}
              aria-invalid={errors.confirm_password ? 'true' : 'false'}
              {...register('confirm_password', {
                required: 'The field is required.',
                validate: (value) => {
                  if (watch('password') !== value) {
                    return 'Passwords must match.'
                  }
                },
              })}
              type="password"
              placeholder="Password"
            />
          </label>
          {errors?.confirm_password && (
            <p className={classes['form__errors']} role="alert">
              {errors.confirm_password?.message}
            </p>
          )}
        </div>
        <div className={classes['form__agreements']}>
          <input
            className={classes['form__checkbox']}
            type="checkbox"
            id="agreements"
            {...register('agreements', {
              required: 'The field is required.',
            })}
          />
          <label htmlFor="agreements">I agree to the processing of my personal information</label>
        </div>
        <div className={classes['form__submit-fields']}>
          <input className={classes['form__submit']} type="submit" value="Create" disabled={!isValid} />
          <p className={classes['form__sign-in']}>
            Already have an account?{' '}
            <Link className={classes['link']} to="/sign-in/">
              Sign In
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignUp)
