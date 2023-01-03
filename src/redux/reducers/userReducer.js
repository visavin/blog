const initialState = {
  email: null,
  token: null,
  username: null,
  bio: null,
  image: null,
  error: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGOUT':
      return {
        email: null,
        token: null,
        username: null,
        bio: null,
        image: null,
        error: null,
      }

    case 'FETCH_USER_REGISTER_SUCCESS':
      return {
        email: action.payload.user.email,
        token: action.payload.user.token,
        username: action.payload.user.username,
        bio: null,
        image: null,
        error: null,
      }

    case 'FETCH_USER_REGISTER_FAILURE':
      return {
        email: action.formData.email,
        token: null,
        username: action.formData.username,
        bio: null,
        image: null,
        error: action.errors,
      }

    case 'FETCH_GET_IMAGE_SUCCESS':
      return {
        email: state.email,
        token: state.token,
        username: state.username,
        bio: state.bio,
        image: action.payload,
        error: null,
      }

    default:
      return state
  }
}
