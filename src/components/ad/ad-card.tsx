import { FC } from 'react';
import { IAd } from '../types/types';

interface AdCardProps {
  ad: IAd;
}

const AdCard: FC<AdCardProps> = ({ ad }) => {
  return (
    <>
      <div className='column'>
        <div className='container has-text-centered'>
          <div className='card'>
            <div className='card-header has-background-primary'>
              <h2 className='card-header-title is-centered title is-2 has-text-white'>
                {!ad.createdBy.name
                  ? ad.createdBy.firstName + ' ' + ad.createdBy.lastName
                  : ad.createdBy.name}
              </h2>
              <p>{ad.city}</p>
            </div>
            <div className='card-content'>
              <div className='content'>
                <p>{ad.content}</p>
                <a className='button is-primary' href={`/ads/${ad.id}`}>
                  Voir
                </a>
              </div>
            </div>
            <div className='card-footer has-background-secondary'>
              <ul>
                {ad.styles?.map((style, index) => (
                  <li key={index}>{style}</li>
                ))}
              </ul>
              <p>{ad.artistReferences}</p>
              <p>{ad.songReferences}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdCard;
