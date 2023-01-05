import { combineReducers } from 'redux'

import { articlesReducer } from './articlesReducer'
import { userReducer } from './userReducer'
import { oneArticleReducer } from './oneArticleReducer'

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
  article: oneArticleReducer,
})

export default rootReducer
