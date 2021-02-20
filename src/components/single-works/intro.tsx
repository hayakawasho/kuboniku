import React from 'react';
import styles from './intro.module.scss';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

interface IProps {
  date: string;
  role: {
    name: string;
  }[];
  description?: string;
  url?: string;
}

const Component: React.FC<IProps> = ({ date, role, description, url }) => {
  return (
    <div className={styles.intro} data-smooth-item>
      <div className={styles.intro__info}>
        <dl className={styles.dl}>
          <dt>Year</dt>
          <dd>{format(parseISO(date), 'MMMM d, yyyy')}</dd>
        </dl>
        <dl className={styles.dl}>
          <dt>Role</dt>
          {role.map((item, i) => (
            <dd className="u-uppercase" key={i}>
              {item.name}
            </dd>
          ))}
        </dl>
      </div>
      <div className={styles.intro__p}>
        {description && (
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        {url && (
          <a className="c-link" href={url} target="_blank" rel="noopener">
            View website
            <div className="c-link__hr" />
          </a>
        )}
      </div>
    </div>
  );
};

export default Component;
