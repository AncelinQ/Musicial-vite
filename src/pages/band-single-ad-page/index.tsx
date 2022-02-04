import { FC } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { useQuery } from '@apollo/client';
import { BandByIDQuery } from './queries';

const BandAdSinglePage: FC<RouteProps> = () => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams();

  if (typeof id === 'undefined') {
    throw new Error('URL Parameter "id" is missing.');
  }

  const { data, loading } = useQuery(BandByIDQuery, { variables: { id } });

  const ad = data?.findBandAdByID;

  return (
    <>
      {loading || typeof ad === 'undefined' ? (
        <div className='is-flex is-justify-content-center'>
          <Audio color='#29298d' height={40} width={40} />
        </div>
      ) : (
        <div>
          <h1 className='title is-1 has-text-centered'>
            <p>{ad.title}</p>
          </h1>
          <div className='has-text-centered'>
            <h3 className='title is-3'> {ad.author?.name}</h3>
            <p>{ad.author?.city}</p>
            <p>{ad.createdAt?.toLocaleDateString()}</p>
          </div>
          <div>
            <h2 className='title is-3'>Description</h2>
            <p>{ad.description}</p>
          </div>
          <div>
            <h3 className='title is-3'>Styles</h3>
            {ad.author?.styles?.data?.map((style, index) => (
              <p key={index}>{style.style?.name}</p>
            ))}
          </div>
          {/* <div>
            <h3 className='title is-3'>Influences</h3>
            {bandAd?.author?.influences?.data?.map((influence, index) => (
              <p key={index}>{influence.refArtist}</p>
            ))}
          </div> */}
        </div>
      )}
    </>
  );
};

export default BandAdSinglePage;
