import { Link, withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'

import { BlogService } from '../../context'
import { fetchUserImage, fetchUserLogin } from '../../redux/actions'

import classes from './SignIn.module.scss'

const SignIn = ({ history }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const BlogApiService = useContext(BlogService)

  const {
    register,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'all' })

  const onSubmit = (data) => {
    const userObject = {
      email: data.email,
      password: data.password,
    }
    dispatch(fetchUserLogin(BlogApiService, userObject))
  }

  useEffect(() => {
    if (user.error)
      setError(
        'password',
        { type: 'validate', message: 'Email address or password is invalid!' },
        { shouldFocus: true }
      )
  }, [user.error])

  useEffect(() => {
    if (user.token) {
      dispatch(fetchUserImage(BlogApiService, user.username))
      history.push('/')
    }
  }, [user.token])

  return (
    <div className={classes['signup-layout']}>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes['form__header']}>Sign In</h1>
        <div className={classes['form__input-fields']}>
          <label className={classes['form__label']}>
            Email address
            <input
              className={classes['form__input']}
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: 'The field is required.',
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
        </div>
        <div className={classes['form__submit-fields']}>
          <input className={classes['form__submit']} type="submit" value="Login" disabled={!isValid} />
          <p className={classes['form__sign-in']}>
            Don’t have an account?{' '}
            <Link className={classes['link']} to="/sign-up/">
              Sign Up
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignIn)
