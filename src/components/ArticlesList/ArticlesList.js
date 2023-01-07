import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { Pagination, Spin } from 'antd'
import { withRouter } from 'react-router-dom'

import { BlogService } from '../../context'
import { articlesOffsetRequested, fetchArticlesList } from '../../redux/actions'
import ArticlePreview from '../ArticlePreview'

import classes from './ArticlesList.module.scss'

const ArticlesList = ({ history }) => {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles)
  const user = useSelector((state) => state.user)
  const BlogApiService = useContext(BlogService)

  useEffect(() => {
    if (user?.token) dispatch(fetchArticlesList(BlogApiService, articles.limit, articles.offset, user.token))
    else dispatch(fetchArticlesList(BlogApiService, articles.limit, articles.offset))
  }, [])

  useEffect(() => {
    if (user?.token) dispatch(fetchArticlesList(BlogApiService, articles.limit, articles.offset, user.token))
    else dispatch(fetchArticlesList(BlogApiService, articles.limit, articles.offset))
  }, [articles.offset])

  const onChangePage = (page) => {
    dispatch(articlesOffsetRequested((page - 1) * articles.limit))
  }

  const elements = articles.articles.map((item) => {
    return (
      <li key={item.slug} onClick={() => history.push(item.slug)}>
        <ArticlePreview item={item} />
      </li>
    )
  })

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />

  const spinner = !articles.articles.length ? <Spin indicator={antIcon} /> : null

  const pagination =
    articles.articles.length && !articles.error ? (
      <Pagination
        defaultPageSize={articles.limit}
        showSizeChanger={false}
        current={articles.offset / articles.limit + 1}
        onChange={onChangePage}
        total={articles.articlesCount < 10000 ? articles.articlesCount : 10000}
      />
    ) : null

  return (
    <div className={classes.container}>
      {spinner}
      <ul className={classes['list']}>{elements}</ul>
      {pagination}
    </div>
  )
}

export default withRouter(ArticlesList)
