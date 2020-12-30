import React from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import ToggleMenu from '~/foundation/components/toggleMenu';
import ToggleSNS from '~/foundation/components/toggleSNS';

const Component: React.FC = () => {
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
};

export default Component;
