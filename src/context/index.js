import React from 'react'

export const BlogService = React.createContext()

const { Provider: BlogApiServiceProvider, Consumer: BlogApiServiceConsumer } = BlogService

export { BlogApiServiceProvider, BlogApiServiceConsumer }
