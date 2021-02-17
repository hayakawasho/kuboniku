import React from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import ToggleMenu from './toggleMenu';
import ToggleSNS from './toggleSNS';

const Component: React.FC = React.memo(() => {
  return (
    <>
      <header className={styles.sh}>
        <Link href="/">
          <a className={styles.logo}>
            <i className="icon-logo" />
          </a>
        </Link>
        <ToggleMenu />
        <ToggleSNS />
        <small className={styles.copy}>&copy; KuboNiku.com</small>
      </header>
    </>
  );
});

export default Component;
