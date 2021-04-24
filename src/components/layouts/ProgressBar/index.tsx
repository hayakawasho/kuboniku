import React from 'react';

const Component: React.FC = ({ children }) => {
  return (
    <div className="l-progress">
      <div className="u-in">
        <div className="c-progressCtrl">{children}</div>
      </div>
    </div>
  );
};

export default Component;
