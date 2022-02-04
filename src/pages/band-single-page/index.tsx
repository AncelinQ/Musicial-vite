import { FC, useState } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { BandByID } from './queries';
import { Audio } from 'react-loader-spinner';
import { useQuery } from '@apollo/client';

const BandsSinglePage: FC<RouteProps> = ({}) => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams();

  if (typeof id === 'undefined') {
    throw new Error('URL Parameter "id" is missing.');
  }

  const { data, loading } = useQuery(BandByID, { variables: { id } });

  const band = data?.findBandByID;

  return (
    <>
      {loading || typeof band === 'undefined' ? (
        <div className='is-flex is-justify-content-center'>
          <Audio color='#29298d' height={40} width={40} />
        </div>
      ) : (
        <div>
          <h1 className='title is-1 has-text-centered'>{band.name}</h1>
          <div className='has-text-centered'>
            <h3 className='title is-3'>{band.city}</h3>
          </div>
          {/* <div>
            <h2 className='title is-3'>Description</h2>
            <p>{band.description}</p>
          </div> */}
          <div>
            <h3 className='title is-3'>Styles</h3>
            {band.styles?.data?.map((style, index) => (
              <p key={index}>{style.style?.name}</p>
            ))}
          </div>
          <div>
            <h3 className='title is-3'>Influences</h3>
            {band.influences?.data?.map((artist, index) => (
              <p key={index}>{artist.refArtist}</p>
            ))}
          </div>
          <div>
            <h3 className='title is-3'>Membres</h3>
            {band?.members?.data?.map((member, index) => (
              <p key={index}>
                {member.firstName} {member.lastName}
              </p>
            ))}
          </div>
          <div>
            <h3 className='title is-3'>Annonces</h3>
            {band?.ads?.data?.map((ad, index) => (
              <p key={index}>{ad.title}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BandsSinglePage;
