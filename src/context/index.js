import React from 'react'

export const BlogApiService = React.createContext()

const { Provider: BlogApiServiceProvider, Consumer: BlogApiServiceConsumer } = BlogApiService

export { BlogApiServiceProvider, BlogApiServiceConsumer }
