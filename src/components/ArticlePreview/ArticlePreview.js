import { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { BlogService } from '../../context'
import { articleResetRequest, fetchArticlesList, fetchDisLikeArticle, fetchLikeArticle } from '../../redux/actions'

import classes from './ArticlePreview.module.scss'

const ArticlePreview = (props) => {
  const { history, item } = props
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const article = useSelector((state) => state.article)
  const articles = useSelector((state) => state.articles)
  const BlogApiService = useContext(BlogService)

  let elements = null
  if (item.tagList) {
    elements = item.tagList
      .filter((el) => (el ? el.length && el !== ' ' : null))
      .map((tag, index) => {
        return (
          <li key={index} className={classes['article-tag']}>
            {tag}
          </li>
        )
      })
  }

  const onHeartClick = (event) => {
    event.stopPropagation()
    if (user?.token) {
      if (item.favorited) dispatch(fetchDisLikeArticle(BlogApiService, item.slug, user.token))
      else dispatch(fetchLikeArticle(BlogApiService, item.slug, user.token))
    } else history.push('/sign-in')
  }

  const favoriteIcon = !item.favorited ? (
    <HeartOutlined onClick={onHeartClick} className={classes['article-heart-img']} />
  ) : (
    <HeartFilled
      onClick={onHeartClick}
      className={[classes['article-heart-img'], classes['article-heart-img__favorite']].join(' ')}
    />
  )

  useEffect(() => {
    if (user?.token) dispatch(fetchArticlesList(BlogApiService, articles.limit, articles.offset, user.token))
  }, [article.article])

  useEffect(() => {
    if (article.article) dispatch(articleResetRequest())
  }, [item.favorited])

  return (
    <div className={classes.article}>
      <div className={classes['article-left-column']}>
        <div className={classes['article-header']}>
          <h5 className={classes['article-title']}>{item.title}</h5>
          {favoriteIcon}
          <p className={classes['article-heart-count']}>{item.favoritesCount}</p>
        </div>
        <ul className={classes['article-taglist']}>{elements}</ul>
        <p className={classes['article-description']}>{item.description}</p>
      </div>
      <div className={classes['article-right-column']}>
        <div className={classes['article-right-column__left']}>
          <h6 className={classes['article-username']}>{item.author.username}</h6>
          <p className={classes['article-date']}>{item.createdAt}</p>
        </div>
        <div className={classes['article-right-column__right']}>
          <img className={classes['article-avatar']} src={item.author.image} alt="" />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default withRouter(ArticlePreview)
