import React from 'react'
import ReactDOM from 'react-dom/client'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './redux/reducers'
import BlogApiService from './services/BlogApiService'
import { BlogApiServiceProvider } from './context'
import './index.css'
import App from './components/App'

const blogApiService = new BlogApiService()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BlogApiServiceProvider value={blogApiService}>
      <App />
    </BlogApiServiceProvider>
  </Provider>
)
