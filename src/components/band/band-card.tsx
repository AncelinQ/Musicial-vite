import { FC } from 'react';
import { IBand } from '../types/types';

interface BandCardProps {
  band: IBand;
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
            </div>
            <div className='card-content'>
              <div className='content'>
                <p></p>
                <a className='button is-primary' href={`/bands/${band.id}`}>
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
