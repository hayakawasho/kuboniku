import React from 'react'
import Link from 'next/link'
import styles from './sh.module.scss'
// import { useSelector, useDispatch } from 'react-redux';

const Component: React.FC = () => {
  return (
    <header className="sh">
      <Link href="/">
        <a className={styles.logo}>
          <i className="icon-logo" />
        </a>
      </Link>

      <button
        type="button"
        id="js-menuButton"
        className={styles.menu}
        aria-label="menu-toggle"
      >
        <div className="c-burger">
          <div className="c-burger__line | js-burger__line"></div>
          <div className="c-burger__line | js-burger__line"></div>
        </div>
      </button>

      <div className={`${styles.sns} u-text-center`}>
        <ul className="snsList">
          <li>
            <a href="https://www.facebook.com/k.b.nagisa" target="_blank">
              Fb
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Tw
            </a>
          </li>
        </ul>
        <button type="button" className="plus-icon" id="js-plus-toggle">
          <div className="plus-icon__x"></div>
          <div className="plus-icon__y"></div>
        </button>
      </div>

      <small className={styles.copy}>&copy; KuboNiku.com</small>
    </header>
  )
}

export default Component
