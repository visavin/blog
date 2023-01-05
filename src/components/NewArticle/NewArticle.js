import { withRouter } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'

import { BlogService } from '../../context'
import { articleResetRequest, fetchCreateArticle } from '../../redux/actions'

import classes from './NewArticle.module.scss'

const NewArticle = ({ history }) => {
  const dispatch = useDispatch()
  const article = useSelector((state) => state.article)
  const user = useSelector((state) => state.user)

  const BlogApiService = useContext(BlogService)

  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'all' })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = (data) => {
    dispatch(fetchCreateArticle(BlogApiService, data, user.token))
  }

  useEffect(() => {
    if (article.article) {
      if (article.article.slug) {
        dispatch(articleResetRequest())
        history.push('/')
      }
    }
  }, [article.article])

  return (
    <div className={classes['new-article-layout']}>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes['form__header']}>Create new article</h1>
        <div className={classes['form__input-fields']}>
          <label className={classes['form__label']}>
            Title
            <input
              className={classes['form__input']}
              aria-invalid={errors.title ? 'true' : 'false'}
              {...register('title', {
                required: 'The field is required.',
                maxLength: { value: 1000, message: 'Your title must consist of a maximum of 1000 characters.' },
              })}
              placeholder="Title"
              autoFocus
            />
          </label>
          {errors?.title && (
            <p className={classes['form__errors']} role="alert">
              {errors.title?.message}
            </p>
          )}
          <label className={classes['form__label']}>
            Short description
            <input
              className={classes['form__input']}
              aria-invalid={errors.description ? 'true' : 'false'}
              {...register('description', {
                required: 'The field is required.',
              })}
              placeholder="Short description"
            />
          </label>
          {errors?.description && (
            <p className={classes['form__errors']} role="alert">
              {errors.description?.message}
            </p>
          )}
          <label className={classes['form__label']}>
            Text
            <textarea
              rows="8"
              className={classes['form__text-area']}
              aria-invalid={errors.body ? 'true' : 'false'}
              {...register('body', {
                required: 'The field is required.',
              })}
              placeholder="Text"
            />
          </label>
          {errors?.body && (
            <p className={classes['form__errors']} role="alert">
              {errors.body?.message}
            </p>
          )}
          <label className={[classes['form__label'], classes['form__label--tags']].join(' ')}>
            Tags
            <div className={classes['tags-container']}>
              <ul className={classes['form__tags-list']}>
                {fields.map((item, index) => (
                  <li key={item.id} className={classes['form__tag']}>
                    <input
                      className={[classes['form__input'], classes['form__input--tags']].join(' ')}
                      {...register(`tagList.${index}`)}
                      placeholder="Tag"
                    />
                    <button
                      className={classes['tag-btn-del']}
                      type="button"
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <button className={classes['tag-btn-add']} type="button" onClick={() => append(null)}>
                Add tag
              </button>
            </div>
          </label>
        </div>
        <div className={classes['form__submit-fields']}>
          <input className={classes['form__submit']} type="submit" value="Send" disabled={!isValid} />
        </div>
      </form>
    </div>
  )
}

export default withRouter(NewArticle)
