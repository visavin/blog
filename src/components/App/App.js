import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { userUpdateSuccess } from '../../redux/actions'
import ArticlesList from '../ArticlesList'
import Header from '../Header'
import ArticleDetails from '../ArticleDetails'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Profile from '../Profile'
import EditArticle from '../EditArticle'

import classes from './App.module.scss'

const App = () => {
  const getLocalStorage = () => {
    const userBlog = window.localStorage.getItem('userBlogData')
    if (userBlog) return JSON.parse(userBlog)
  }
  const dispatch = useDispatch()
  const initialUserState = getLocalStorage()
  if (initialUserState) dispatch(userUpdateSuccess(initialUserState))

  return (
    <Router>
      <div className={classes.container}>
        <Header />
        <Switch>
          <Route path="/" render={() => <Redirect to="/articles/" />} exact />
          <Route path="/articles/" component={ArticlesList} exact />
          <Route
            exact
            path="/articles/:id"
            render={({ match }) => {
              const { id } = match.params
              return <ArticleDetails slug={id} />
            }}
          />
          <Route
            path="/articles/:id/edit"
            render={({ match }) => {
              const { id } = match.params
              return <EditArticle slug={id} />
            }}
          />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route path="/new-article" component={EditArticle} />
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
