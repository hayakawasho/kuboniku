import React from 'react';

type IProps = {
  html: string;
};

const Component = (props: IProps) => {
  return (
    <>
      <h1 className="sr-only">PROFILE</h1>
      <div className="prf-container">
        <div className="prf-container__in">
          <div className="prf-hgroup">
            <h2 className="prf-heading">Nagisa Kubo</h2>
            <p className="prf-hgroup__p">Art Director & Designer</p>
          </div>
          <div
            className="prf-about"
            dangerouslySetInnerHTML={{ __html: props.html }}
          />
        </div>
      </div>
    </>
  );
};

export default Component;
