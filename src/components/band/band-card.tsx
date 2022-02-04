import { FC } from 'react';
import { Band } from '../../types/api';

interface BandCardProps {
  band: Band;
}

const BandCard: FC<BandCardProps> = ({ band }) => {
  return (
    <>
      <div className='column'>
        <div className='container has-text-centered'>
          <div className='card'>
            <div className='card-header has-background-primary'>
              <h2 className='card-header-title is-centered title is-2 has-text-white	'>
                {band.name}
              </h2>
              <p>{band.city}</p>
            </div>
            <div className='card-content'>
              <div className='content'>
                <div className='tags'>
                  {band.styles?.data?.map((style, index) => (
                    <span key={index} className='tag'>
                      {style.style?.name}
                    </span>
                  ))}
                </div>
                <a className='button is-primary' href={`/bands/${band._id}`}>
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

export default BandCard;
