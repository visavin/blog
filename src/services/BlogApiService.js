import { format, parseISO } from 'date-fns'

export default class BlogApiService {
  _apiBase = 'https://blog.kata.academy/api'

  async getResource(url, parameters = '') {
    const res = await fetch(`${this._apiBase}${url}${parameters}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }

  async getArticlesList(limit, offset) {
    const result = await this.getResource('/articles', `?limit=${limit}&offset=${offset}`)
    return {
      articles: result.articles.map(this._transformArticles),
      articlesCount: result.articlesCount,
    }
  }

  _transformArticles(article) {
    const shorten = (str, maxLen = 100, separator = ' ') => {
      if (str.length <= maxLen) return str
      return str.substring(0, str.lastIndexOf(separator, maxLen)) + '...'
    }

    const formatDate = (date) => {
      try {
        return format(parseISO(date), 'MMMM dd, yyyy')
      } catch (error) {
        console.log(error.message)
      }
    }

    return {
      ...article,
      title: shorten(article.title, 50),
      createdAt: formatDate(article.createdAt),
      updatedAt: formatDate(article.updatedAt),
      description: shorten(article.description, 200),
    }
  }
}