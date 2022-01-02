import { FC, useState } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { Ads } from '../data/data';

const AdsSinglePage: FC<RouteProps> = () => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams<string>();
  const [ads, setAd] = useState(Ads);
  const ad = ads.find((ad) => ad.id == Number(id));
  return (
    <>
      <h1 className='title is-1 has-text-centered'>
        <p>{ad?.title}</p>
      </h1>
      <div className='has-text-centered'>
        <h3 className='title is-3'>
          {' '}
          {!ad?.createdBy.name
            ? ad?.createdBy.firstName + ' ' + ad?.createdBy.lastName
            : ad?.createdBy.name}
        </h3>
        <p>{ad?.city}</p>
        <p>{ad?.createdAt.toLocaleDateString()}</p>
      </div>
      <div>
        <h2 className='title is-3'>Description</h2>
        <p>{ad?.description}</p>
      </div>
      <div>
        <h3 className='title is-3'>Instruments</h3>
        {ad?.instruments?.map((instrument, index) => (
          <p key={index}>{instrument}</p>
        ))}
      </div>
      <div>
        <h3 className='title is-3'>Styles</h3>
        {ad?.styles?.map((style, index) => (
          <p key={index}>{style}</p>
        ))}
      </div>
      <div>
        <h3 className='title is-3'>Influences</h3>
        <h3 className='title is-4'>Artistes</h3>
        {ad?.artistReferences?.map((artist, index) => (
          <p key={index}>{artist}</p>
        ))}
        <h3 className='title is-4'>Chansons</h3>
        {ad?.songReferences?.map((song, index) => (
          <p key={index}>{song}</p>
        ))}
      </div>
    </>
  );
};

export default AdsSinglePage;
