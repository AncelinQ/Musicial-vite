import { FC, useState } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { Bands } from '../data/data';

const BandsSinglePage: FC<RouteProps> = ({}) => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams<{ id: string }>();
  const [bands, setBand] = useState(Bands);
  const band = bands.find((band) => band.id == Number(id));
  return (
    <>
      <h1 className='title is-1 has-text-centered'>{band?.name}</h1>
      <div className='has-text-centered'>
        <h3 className='title is-3'>{band?.city}</h3>
      </div>
      <div>
        <h2 className='title is-3'>Description</h2>
        <p>{band?.description}</p>
      </div>
      <div>
        <h3 className='title is-3'>Styles</h3>
        {band?.styles?.map((style, index) => (
          <p key={index}>{style}</p>
        ))}
      </div>
      <div>
        <h3 className='title is-3'>Influences</h3>
        <h3 className='title is-4'>Artistes</h3>
        {band?.artistReferences?.map((artist, index) => (
          <p key={index}>{artist}</p>
        ))}
        <h3 className='title is-4'>Chansons</h3>
        {band?.songReferences?.map((song, index) => (
          <p key={index}>{song}</p>
        ))}
      </div>
      <div>
        <h3 className='title is-3'>Groupes</h3>
        {band?.members?.map((member, index) => (
          <p key={index}>
            {member.firstName} {member.lastName}
          </p>
        ))}
      </div>
    </>
  );
};

export default BandsSinglePage;
