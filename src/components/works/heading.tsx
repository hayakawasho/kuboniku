import React from 'react';
import styles from './heading.module.scss';

interface IProps {
  total: number;
}

const Component: React.FC<IProps> = ({ total }) => {
  return (
    <h1 className={styles.heading}>
      <div data-smooth-item>
        Works<sup className={styles.heading__total}>{total}</sup>
      </div>
    </h1>
  );
};

export default Component;
