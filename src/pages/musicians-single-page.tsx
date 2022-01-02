import { FC, useState } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { Users } from '../data/data';

const MusiciansSinglePage: FC<RouteProps> = ({}) => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams<{ id: string }>();
  const [users, setUser] = useState(Users);
  const user = users.find((user) => user.id == Number(id));
  return (
    <>
      <h1 className='title is-1 has-text-centered'>
        {user?.firstName} {user?.lastName}
      </h1>
      <div className='has-text-centered'>
        <h3 className='title is-3'>{user?.city}</h3>
        <p>{user?.age} ans</p>
      </div>
      <div>
        <h2 className='title is-3'>Description</h2>
        <p>{user?.description}</p>
      </div>
      <div>
        <h3 className='title is-3'>Instruments</h3>
        {user?.instruments?.map((instrument, index) => (
          <p key={index}>{instrument}</p>
        ))}
      </div>
      <div>
        <h3 className='title is-3'>Styles</h3>
        {user?.styles?.map((style, index) => (
          <p key={index}>{style}</p>
        ))}
      </div>
      <div>
        <h3 className='title is-3'>Influences</h3>
        <h3 className='title is-4'>Artistes</h3>
        {user?.artistReferences?.map((artist, index) => (
          <p key={index}>{artist}</p>
        ))}
        <h3 className='title is-4'>Chansons</h3>
        {user?.songReferences?.map((song, index) => (
          <p key={index}>{song}</p>
        ))}
      </div>
      <div>
        <h3 className='title is-3'>Groupes</h3>
        {user?.bands?.map((band, index) => (
          <p key={index}>{band.name}</p>
        ))}
      </div>
    </>
  );
};

export default MusiciansSinglePage;
