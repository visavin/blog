export const articlesOffsetRequested = (offset) => ({ type: 'SET_ARTICLES_OFFSET', payload: offset })

const articlesListLoaded = (newArticles) => ({ type: 'FETCH_GET_ARTICLES_SUCCESS', payload: newArticles })

const articlesListError = (error) => ({ type: 'FETCH_GET_ARTICLES_FAILURE', payload: error })

export const fetchArticlesList = (blogApiService, limit, offset) => (dispatch) => {
  blogApiService
    .getArticlesList(limit, offset)
    .then((data) => dispatch(articlesListLoaded(data)))
    .catch((err) => dispatch(articlesListError(err)))
}
