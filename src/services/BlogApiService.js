export default class BlogApiService {
  _apiBase = 'https://blog.kata.academy/api/'

  async getResource(url, parameters = '') {
    const res = await fetch(`${this._apiBase}${url}${parameters}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }

  async getSearchId() {
    const searchIdObj = await this.getResource('/search')
    return searchIdObj['searchId']
  }

  async getTickets(searchId) {
    return await this.getResource('/tickets', `?searchId=${searchId}`)
  }
}
