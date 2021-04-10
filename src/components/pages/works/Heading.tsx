import React from 'react';

type Props = {
  total: number;
};

const Component: React.FC<Props> = ({ total }) => {
  return (
    <h1 className="worksIndexHeading">
      <div data-smooth-item>
        Works<sup className="worksIndexHeading__total">{total}</sup>
      </div>
    </h1>
  );
};

export default Component;
