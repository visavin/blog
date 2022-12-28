import React from 'react'
import ReactDOM from 'react-dom/client'

import BlogApiService from './services/BlogApiService'
import { BlogApiServiceProvider } from './context'
import './index.css'
import App from './components/App'

const blogApiService = new BlogApiService()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BlogApiServiceProvider value={blogApiService}>
    <App />
  </BlogApiServiceProvider>
)
