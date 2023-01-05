import { HeartOutlined } from '@ant-design/icons'

import classes from './ArticlePreview.module.scss'

const ArticlePreview = ({ item }) => {
  let elements = null
  if (item.tagList) {
    elements = item.tagList
      .filter((el) => (el ? el.length : null))
      .map((tag, index) => {
        return (
          <li key={index} className={classes['article-tag']}>
            {tag}
          </li>
        )
      })
  }

  return (
    <div className={classes.article}>
      <div className={classes['article-left-column']}>
        <div className={classes['article-header']}>
          <h5 className={classes['article-title']}>{item.title}</h5>
          <HeartOutlined className={classes['article-heart-img']} />
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

export default ArticlePreview
