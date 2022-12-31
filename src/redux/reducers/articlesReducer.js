const initialState = {
  articles: [],
  articlesCount: null,
  error: null,
  limit: 50,
  offset: 28000,
}

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES_OFFSET':
      return {
        articles: [],
        articlesCount: state.articlesCount,
        error: null,
        limit: state.limit,
        offset: action.payload,
      }

    case 'FETCH_GET_ARTICLES_SUCCESS':
      return {
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        error: null,
        limit: state.limit,
        offset: state.offset,
      }

    case 'FETCH_GET_ARTICLES_FAILURE':
      return {
        articles: state.articles,
        articlesCount: state.articlesCount,
        error: action.payload,
        limit: state.limit,
        offset: state.offset,
      }

    default:
      return state
  }
}
