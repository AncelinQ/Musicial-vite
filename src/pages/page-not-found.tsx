import React, { FC } from 'react';
import { RouteProps } from 'react-router';

const PageNotFound: FC<RouteProps> = () => {
  return (
    <>
      <h1>You're lost !</h1>
      <h3>
        Come back <a href='/'>home</a> !
      </h3>
    </>
  );
};

export default PageNotFound;
