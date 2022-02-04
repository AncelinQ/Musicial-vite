import { useQuery } from '@apollo/client';
import { FC } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { MusicianByID } from './queries';
import { Audio } from 'react-loader-spinner';

const MusiciansSinglePage: FC<RouteProps> = ({}) => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams();

  if (typeof id === 'undefined') {
    throw new Error('URL Parameter "id" is missing.');
  }

  const { data, loading } = useQuery(MusicianByID, { variables: { id } });

  const musician = data?.findMusicianByID;

  return (
    <>
      {loading || typeof musician === 'undefined' ? (
        <div className='is-flex is-justify-content-center'>
          <Audio color='#29298d' height={40} width={40} />
        </div>
      ) : (
        <div>
          <h1 className='title is-1 has-text-centered'>
            {musician.firstName} {musician.lastName}
          </h1>
          <div className='has-text-centered'>
            <h3 className='title is-3'>{musician.city}</h3>
            {/* <p>{musician.age} ans</p> */}
          </div>
          {/* <div>
            <h2 className='title is-3'>Description</h2>
            <p>{musician.description}</p>
          </div>
          <div>
            <h3 className='title is-3'>Instruments</h3>
            {musician.instruments?.map((instrument, index) => (
              <p key={index}>{instrument}</p>
            ))}
          </div> */}
          <div>
            <h3 className='title is-3'>Instrument</h3>
            <p>{musician.instrument?.name}</p>
          </div>
          <div>
            <h3 className='title is-3'>Styles</h3>
            {musician.styles?.data?.map((style, index) => (
              <p key={index}>{style.style?.name}</p>
            ))}
          </div>
          <div>
            <h3 className='title is-3'>Influences</h3>
            {musician.influences?.data?.map((artist, index) => (
              <p key={index}>{artist.refArtist}</p>
            ))}
          </div>
          <div>
            <h3 className='title is-3'>Groupe</h3>
            <p>{musician.band?.name}</p>
          </div>
          {/* <div>
            <h3 className='title is-3'>Groupes</h3>
            {user?.bands?.map((band, index) => (
              <p key={index}>{band.name}</p>
            ))}
          </div> */}
          <div>
            <h3 className='title is-3'>Annonces</h3>
            {musician.ads?.data?.map((ad, index) => (
              <p key={index}>{ad.title}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MusiciansSinglePage;
