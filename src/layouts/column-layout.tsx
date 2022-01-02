import React from 'react';
import { FC } from 'react';
import { Navbar } from '../components/navbar';

const ColumnLayout: FC = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container">
          <div className="columns">{children}</div>
        </div>
      </main>
    </>
  );
};

export default ColumnLayout;
