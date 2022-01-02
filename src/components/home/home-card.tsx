import React, { FC, useState } from 'react';

interface HomeCardProps {
  title: string;
  description: string;
  url: string;
  urlDescription: string;
}

const HomeCard: FC<HomeCardProps> = ({
  title,
  description,
  url,
  urlDescription,
}) => {
  return (
    <>
      <div className='column'>
        <div className='container has-text-centered'>
          <div className='card'>
            <div className='card-header has-background-primary'>
              <h2 className='card-header-title is-centered title is-2 has-text-white	'>
                {title}
              </h2>
            </div>
            <div className='card-content'>
              <div className='content'>
                <p>{description}</p>
                <a className='button is-primary' href={url}>
                  {urlDescription}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
