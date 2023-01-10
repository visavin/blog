import { format, parseISO } from 'date-fns'

export default class BlogApiService {
  _apiBase = 'https://blog.kata.academy/api'

  async authJsonDeleteRequest(url, token) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    })

    return await res.json()
  }

  async unFavoriteArticle(slug, token) {
    return await this.authJsonDeleteRequest(`/articles/${slug}/favorite`, token)
  }

  async authDeleteRequest(url, token) {
    return await fetch(`${this._apiBase}${url}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  }

  async deleteArticle(slug, token) {
    return await this.authDeleteRequest(`/articles/${slug}`, token)
  }

  async authPostRequest(url, token, bodyRequest) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(bodyRequest),
    })

    return await res.json()
  }

  async authEmptyPostRequest(url, token) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    })

    return await res.json()
  }

  async favoriteArticle(slug, token) {
    return await this.authEmptyPostRequest(`/articles/${slug}/favorite`, token)
  }

  async updateArticle(article, token, slug) {
    if (slug)
      return await this.authPutRequest(`/articles/${slug}`, token, {
        article: article,
      })
    else
      return await this.authPostRequest('/articles', token, {
        article: article,
      })
  }

  async authPutRequest(url, token, bodyRequest) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(bodyRequest),
    })

    return await res.json()
  }

  async updateUsers(user, token) {
    return await this.authPutRequest('/user', token, {
      user: user,
    })
  }

  async postRequest(url, bodyRequest, parameters = '') {
    const res = await fetch(`${this._apiBase}${url}${parameters}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(bodyRequest),
    })

    return await res.json()
  }

  async loginUsers(user) {
    return await this.postRequest('/users/login', {
      user: user,
    })
  }

  async registerUsers(user) {
    return await this.postRequest('/users', {
      user: user,
    })
  }

  async authGetResource(url, token, parameters = '') {
    let res
    if (token) {
      res = await fetch(`${this._apiBase}${url}${parameters}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    } else res = await fetch(`${this._apiBase}${url}${parameters}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }

  async getResource(url, parameters = '') {
    const res = await fetch(`${this._apiBase}${url}${parameters}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }

  async getUserProfile(username) {
    const result = await this.getResource(`/profiles/${username}`)
    return result.profile
  }

  async getArticlesList(limit, offset, token) {
    const result = await this.authGetResource('/articles', token, `?limit=${limit}&offset=${offset}`)
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
    // const newTagList = article.tagList.map((item) => shorten(item, 100))

    return {
      ...article,
      // tagList: newTagList,
      title: shorten(article.title, 50),
      createdAt: formatDate(article.createdAt),
      updatedAt: formatDate(article.updatedAt),
      description: shorten(article.description, 200),
    }
  }
}
