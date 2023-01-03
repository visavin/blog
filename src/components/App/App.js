import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import ArticlesList from '../ArticlesList'
import Header from '../Header'
import ArticleDetails from '../ArticleDetails'
import SignUp from '../SignUp'

import classes from './App.module.scss'

const App = () => {
  return (
    <Router>
      <div className={classes.container}>
        <Header />
        <Switch>
          <Route path="/" render={() => <Redirect to="/articles/" />} exact />
          <Route path="/articles/" component={ArticlesList} exact />
          <Route
            path="/articles/:id"
            render={({ match }) => {
              const { id } = match.params
              return <ArticleDetails slug={id} />
            }}
          />
          <Route path="/sign-up" component={SignUp} />
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
