import React, { useContext, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { message, Popconfirm } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import './ArticleDetails.scss'
import { BlogService } from '../../context'
import { articleResetRequest, fetchArticlesList, fetchDisLikeArticle, fetchLikeArticle } from '../../redux/actions'

const ArticleDetails = (props) => {
  const { history, slug } = props
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const article = useSelector((state) => state.article)
  const articles = useSelector((state) => state.articles)
  const BlogApiService = useContext(BlogService)
  if (!articles.articles.length) return <Redirect to="/articles/" />

  const item = articles.articles.filter((element) => element.slug === slug)[0]

  let elements = null
  if (item.tagList) {
    elements = item.tagList
      .filter((el) => (el ? el.length && el !== ' ' : null))
      .map((tag, index) => {
        return (
          <li key={index} className="article-tag">
            {tag}
          </li>
        )
      })
  }

  const onHeartClick = () => {
    //if (user?.token) {
    if (item.favorited) dispatch(fetchDisLikeArticle(BlogApiService, item.slug, user.token))
    else dispatch(fetchLikeArticle(BlogApiService, item.slug, user.token))
    //} else history.push('/sign-in')
  }

  const favoriteIcon = !user?.token ? (
    <HeartOutlined className="article-heart-img" />
  ) : item.favorited ? (
    <HeartFilled
      onClick={onHeartClick}
      className="article-heart-img article-heart-img--link article-heart-img__favorite"
    />
  ) : (
    <HeartOutlined onClick={onHeartClick} className="article-heart-img article-heart-img--link" />
  )

  useEffect(() => {
    if (user?.token) dispatch(fetchArticlesList(BlogApiService, articles.limit, articles.offset, user.token))
  }, [article.article])

  useEffect(() => {
    if (article.article) dispatch(articleResetRequest())
  }, [item.favorited])

  const confirm = () => {
    message
      .success('Your article will be deleted now')
      .then(BlogApiService.deleteArticle(slug, user.token))
      .then(() => history.push('/'))
  }

  const cancel = () => {
    message.error('You canceled the deletion')
  }

  const onEdit = () => {
    history.push(`/articles/${slug}/edit`)
  }

  const authButtonBlock =
    user.token && user.username ? (
      user.username === item.author.username ? (
        <div className="auth-block">
          <Popconfirm
            title="Are you sure to delete this article?"
            placement={'right'}
            description=""
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button className="auth-block__delete">Delete</button>
          </Popconfirm>
          <button className="auth-block__edit" onClick={onEdit}>
            Edit
          </button>
        </div>
      ) : null
    ) : null

  return (
    <div className="artcontainer">
      <div className="article">
        <div className="article-left-column">
          <div className="article-header">
            <h5 className="article-title">{item.title}</h5>
            {favoriteIcon}
            <p className="article-heart-count">{item.favoritesCount}</p>
          </div>
          <ul className="article-taglist">{elements}</ul>
          <p className="article-description">{item.description}</p>
        </div>
        <div className="article-right-column">
          <div className="article-right-column__top">
            <div className="article-right-column__left">
              <h6 className="article-username">{item.author.username}</h6>
              <p className="article-date">{item.createdAt}</p>
            </div>
            <div className="article-right-column__right">
              <img className="article-avatar" src={item.author.image} alt="" />
            </div>
          </div>
          {authButtonBlock}
        </div>
      </div>
      <div className="article-body">
        <ReactMarkdown>{item.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default withRouter(ArticleDetails)
