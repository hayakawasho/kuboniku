import React from 'react';

interface IProps {
  total: number;
}

const Component: React.FC<IProps> = ({ total }) => {
  return (
    <h1 className="worksIndexHeading">
      <div data-smooth-item>
        Works<sup className="worksIndexHeading__total">{total}</sup>
      </div>
    </h1>
  );
};

export default Component;
