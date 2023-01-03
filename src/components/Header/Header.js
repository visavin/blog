import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogoutSuccess } from '../../redux/actions'

import classes from './Header.module.scss'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const headerMenu = !user.token ? (
    <ul className={classes['header-column']}>
      <li>
        <Link className={classes['header-link']} to="/sign-in/">
          Sign In
        </Link>
      </li>
      <li>
        <Link className={[classes['header-link'], classes['border-green']].join(' ')} to="/sign-up/">
          Sign Up
        </Link>
      </li>
    </ul>
  ) : (
    <ul className={classes['header-column']}>
      <li>
        <Link
          className={[classes['header-link'], classes['header-link__small'], classes['border-green']].join(' ')}
          to="/new-article/"
        >
          Create article
        </Link>
      </li>
      <li>
        <h6 className={classes['header-username']}>{user.username}</h6>
      </li>
      <li>
        <img className={classes['header-avatar']} src={user.image} alt="" />
      </li>
      <li>
        <button
          className={[classes['header-link'], classes['border-black']].join(' ')}
          onClick={() => dispatch(userLogoutSuccess())}
        >
          Log Out
        </button>
      </li>
    </ul>
  )

  return (
    <div className={classes.header}>
      <div className={classes['header-column']}>
        <h6 className={classes['header-logo']}>
          <Link className={classes['header-link']} to="/">
            Realworld Blog
          </Link>
        </h6>
      </div>
      {headerMenu}
    </div>
  )
}

export default Header
