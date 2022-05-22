import { FC } from 'react';
import { Musician } from '../../common/types/types';

interface MusicianCardProps {
  musician: Musician;
}

const MusicianCard: FC<MusicianCardProps> = ({ musician }) => {
  return (
    <>
      <div className='column'>
        <div className='container has-text-centered'>
          <div className='card'>
            <div className='card-header has-background-primary'>
              <h2 className='card-header-title is-centered title is-2 has-text-white	'>
                {musician.adminUser?.firstName} {musician.adminUser?.lastName}
              </h2>
            </div>
            <div className='has-background-primary'>
              <p>{musician.city}</p>
              <p>{musician.instrument?.name}</p>
            </div>
            <div className='card-content'>
              <div className='content'>
                {musician.styles?.data?.map((style, index) => (
                  <p key={index}>{style.style?.name}</p>
                ))}
                <a
                  className='button is-primary'
                  href={`/musicians/${musician._id}`}
                >
                  Voir
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicianCard;
