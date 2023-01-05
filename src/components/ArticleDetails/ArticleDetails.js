import ReactMarkdown from 'react-markdown'
import { HeartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import './ArticleDetails.scss'

const ArticleDetails = ({ slug }) => {
  const articles = useSelector((state) => state.articles)
  const item = articles.articles.filter((element) => element.slug === slug)[0]

  let elements = null
  if (item.tagList) {
    elements = item.tagList
      .filter((el) => (el ? el.length : null))
      .map((tag, index) => {
        return (
          <li key={index} className="article-tag">
            {tag}
          </li>
        )
      })
  }

  return (
    <div className="artcontainer">
      <div className="article">
        <div className="article-left-column">
          <div className="article-header">
            <h5 className="article-title">{item.title}</h5>
            <HeartOutlined className="article-heart-img" />
            <p className="article-heart-count">{item.favoritesCount}</p>
          </div>
          <ul className="article-taglist">{elements}</ul>
          <p className="article-description">{item.description}</p>
        </div>
        <div className="article-right-column">
          <div className="article-right-column__left">
            <h6 className="article-username">{item.author.username}</h6>
            <p className="article-date">{item.createdAt}</p>
          </div>
          <div className="article-right-column__right">
            <img className="article-avatar" src={item.author.image} alt="" />
          </div>
        </div>
      </div>
      <div className="article-body">
        <ReactMarkdown>{item.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleDetails
