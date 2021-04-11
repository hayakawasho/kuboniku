import React from 'react';
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
    <div className="worksDetailIntro" data-smooth-item>
      <div className="worksDetailIntro__info">
        <dl className="worksDetailIntroDl">
          <dt>Year</dt>
          <dd>{format(parseISO(date), 'MMMM d, yyyy')}</dd>
        </dl>
        <dl className="worksDetailIntroDl">
          <dt>Role</dt>
          {role.map((item, i) => (
            <dd className="u-uppercase" key={i}>
              {item.name}
            </dd>
          ))}
        </dl>
      </div>
      <div className="worksDetailIntro__p">
        {description && (
          <div
            className="worksDetailIntroDesc"
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
