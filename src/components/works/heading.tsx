import React from 'react';
import styles from './heading.module.scss';

type Props = {
  total: number;
};

const Component: React.FC<Props> = ({ total }) => {
  return (
    <h1 className={styles.heading}>
      <div data-smooth-item>
        Works<sup className={styles.heading__total}>{total}</sup>
      </div>
    </h1>
  );
};

export default Component;
