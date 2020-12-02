import React from 'react'
import Link from 'next/link'
import styles from './nav.module.scss'
// import { useSelector, useDispatch } from 'react-redux';

const Component = React.memo(() => {
  return (
    <>
      <nav className={styles.navMenu}>
        <div className="u-in">
          <div className={`${styles.navMenu__mask} u-mobile`} />
          <div className={`${styles.navMenu__bg} u-mobile`} />
          <ul className={styles.menuist}>
            {
              //<li><a href="{{ site.link }}/about">About</a></li>
            }
            <li>
              <Link href="/works">
                <a className={styles.link}>Works</a>
              </Link>
            </li>
            <li>
              <a className={styles.link} href="mailto:k.bo.n10.05@gmail.com">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
})

export default Component
