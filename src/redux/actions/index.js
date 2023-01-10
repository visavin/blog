export const articlesOffsetRequested = (offset) => ({ type: 'SET_ARTICLES_OFFSET', payload: offset })

const articlesListLoaded = (newArticles) => ({ type: 'FETCH_GET_ARTICLES_SUCCESS', payload: newArticles })

const articlesListError = (error) => ({ type: 'FETCH_GET_ARTICLES_FAILURE', payload: error })

export const fetchArticlesList = (blogApiService, limit, offset, token = null) => {
  return (dispatch) => {
    blogApiService
      .getArticlesList(limit, offset, token)
      .then((data) => dispatch(articlesListLoaded(data)))
      .catch((err) => dispatch(articlesListError(err)))
  }
}

export const userRegisteredSuccess = (user) => ({ type: 'FETCH_USER_REGISTER_SUCCESS', payload: user })

export const userRegisteredError = (errors, formData) => ({ type: 'FETCH_USER_REGISTER_FAILURE', errors, formData })

export const fetchUserRegister = (blogApiService, user) => (dispatch) => {
  blogApiService.registerUsers(user).then((data) => {
    if (data.user) dispatch(userRegisteredSuccess(data))
    if (data.errors) dispatch(userRegisteredError(data, user))
  })
}

const userImageLoaded = (image) => ({ type: 'FETCH_GET_IMAGE_SUCCESS', payload: image })

export const fetchUserImage = (blogApiService, username) => (dispatch) => {
  blogApiService.getUserProfile(username).then((data) => dispatch(userImageLoaded(data.image)))
}

export const userLogoutSuccess = () => ({ type: 'SET_LOGOUT' })

export const userLoginSuccess = (user) => ({ type: 'FETCH_USER_LOGIN_SUCCESS', payload: user })

export const userLoginError = (errors, formData) => ({ type: 'FETCH_USER_LOGIN_FAILURE', errors, formData })

export const fetchUserLogin = (blogApiService, user) => (dispatch) => {
  blogApiService.loginUsers(user).then((data) => {
    if (data.user) dispatch(userLoginSuccess(data))
    if (data.errors) dispatch(userLoginError(data, user))
  })
}

export const userUpdateSuccess = (user) => ({ type: 'FETCH_USER_UPDATE_SUCCESS', payload: user })

export const userUpdateError = (errors, formData) => ({ type: 'FETCH_USER_UPDATE_FAILURE', errors, formData })

export const fetchUserUpdate = (blogApiService, user, token) => (dispatch) => {
  blogApiService.updateUsers(user, token).then((data) => {
    if (data.user) {
      dispatch(userUpdateSuccess(data))
      window.localStorage.setItem('userBlogData', JSON.stringify(data))
      alert('Profile update success')
    }
    if (data.errors) dispatch(userUpdateError(data, user))
  })
}

export const articleResetRequest = () => ({ type: 'SET_ARTICLE_RESET' })

export const didArticleSuccess = (article) => ({ type: 'FETCH_ARTICLE_SUCCESS', payload: article })

export const fetchCreateArticle = (blogApiService, article, token) => (dispatch) => {
  blogApiService.createArticle(article, token).then((data) => {
    if (data.article) dispatch(didArticleSuccess(data))
  })
}

export const fetchUpdateArticle = (blogApiService, article, token, slug) => (dispatch) => {
  blogApiService.updateArticle(article, token, slug).then((data) => {
    if (data.article) dispatch(didArticleSuccess(data))
  })
}

export const fetchLikeArticle = (blogApiService, slug, token) => (dispatch) => {
  blogApiService.favoriteArticle(slug, token).then((data) => {
    if (data.article) dispatch(didArticleSuccess(data))
  })
}

export const fetchDisLikeArticle = (blogApiService, slug, token) => (dispatch) => {
  blogApiService.unFavoriteArticle(slug, token).then((data) => {
    if (data.article) dispatch(didArticleSuccess(data))
  })
}
