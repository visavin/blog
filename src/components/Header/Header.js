import { Link } from 'react-router-dom'

import classes from './Header.module.scss'

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes['header-column']}>
        <h6 className={classes['header-logo']}>
          <Link className={classes['header-link']} to="/">
            Realworld Blog
          </Link>
        </h6>
      </div>
      <ul className={classes['header-column']}>
        <li>
          <Link className={classes['header-link']} to="/people/">
            Sign In
          </Link>
        </li>
        <li>
          <Link className={[classes['header-link'], classes['border-green']].join(' ')} to="/people/">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
