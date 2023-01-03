export const articlesOffsetRequested = (offset) => ({ type: 'SET_ARTICLES_OFFSET', payload: offset })

const articlesListLoaded = (newArticles) => ({ type: 'FETCH_GET_ARTICLES_SUCCESS', payload: newArticles })

const articlesListError = (error) => ({ type: 'FETCH_GET_ARTICLES_FAILURE', payload: error })

export const fetchArticlesList = (blogApiService, limit, offset) => (dispatch) => {
  blogApiService
    .getArticlesList(limit, offset)
    .then((data) => dispatch(articlesListLoaded(data)))
    .catch((err) => dispatch(articlesListError(err)))
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
