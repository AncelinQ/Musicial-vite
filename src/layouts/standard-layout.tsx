import React from 'react';
import { FC } from 'react';
import { Navbar } from '../components/navbar';

const StandardLayout: FC = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className='container'>{children}</div>
      </main>
    </>
  );
};

export default StandardLayout;
