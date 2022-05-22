import { FC, useState } from 'react';
import { Ad } from '../../types/api';

interface AdCardProps {
  ad: Ad;
}

const AdCard: FC<AdCardProps> = ({ ad }) => {
  let adUri;

  if (ad.author?.name === undefined && ad.author?.firstName !== undefined) {
    adUri = 'musician';
  } else if (
    ad.author?.name !== undefined &&
    ad.author?.firstName === undefined
  ) {
    adUri = 'band';
  }

  return (
    <>
      <div className='column'>
        <div className='container has-text-centered'>
          <div className='card'>
            <div className='card-header has-background-primary'>
              <h2 className='card-header-title is-centered title is-2 has-text-white'>
                {!ad.author?.name
                  ? ad.author?.firstName + ' ' + ad.author?.lastName
                  : ad.author?.name}
              </h2>
              <p>{ad.author?.city}</p>
            </div>
            <div className='card-content'>
              <div className='content'>
                <h3>{ad.title}</h3>
                <div className='tags  is-flex is-justify-content-flex-end'>
                  {ad.author?.styles?.data?.map((style, index) => (
                    <span key={index} className='tag'>
                      {style.style?.name}
                    </span>
                  ))}
                </div>
                <a
                  className='button is-primary'
                  href={`/${adUri}/ads/${ad._id}`}
                >
                  Voir
                </a>
              </div>
            </div>
            <div className='card-footer has-background-secondary'>
              {/* <ul>
                {ad.author?.influences?.map((style, index) => (
                  <li key={index}>{style}</li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdCard;
