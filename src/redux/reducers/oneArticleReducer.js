const initialState = {}

export const oneArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLE_RESET':
      return {}

    case 'FETCH_ARTICLE_SUCCESS':
      return action.payload

    default:
      return state
  }
}
