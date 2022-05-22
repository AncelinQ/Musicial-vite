import { FC } from 'react';
import { Artist } from '../../common/types/types';

interface ProfileProps {
  artist: Artist;
}

const Profile: FC<ProfileProps> = ({ artist }) => {
  return (
    <>
      <div>
        <h1 className='title is-1 has-text-centered'>
          {!artist.name
            ? artist.adminUser?.firstName + ' ' + artist.adminUser?.lastName
            : artist.name}
        </h1>
        <div className='has-text-centered'>
          <h3 className='title is-3'>{artist.city}</h3>
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
          <p>{artist.instrument?.name}</p>
        </div>
        <div>
          <h3 className='title is-3'>Styles</h3>
          {artist.styles?.data?.map((style, index) => (
            <p key={index}>{style.style?.name}</p>
          ))}
        </div>
        <div>
          <h3 className='title is-3'>Influences</h3>
          {artist.influences?.data?.map((artist, index) => (
            <p key={index}>{artist.refArtist}</p>
          ))}
        </div>
        {/* <div>
          <h3 className='title is-3'>Groupe</h3>
          <p>{artist.band?.name}</p>
        </div> */}
        {/* <div>
            <h3 className='title is-3'>Groupes</h3>
            {user?.bands?.map((band, index) => (
              <p key={index}>{band.name}</p>
            ))}
          </div> */}
        <div>
          <h3 className='title is-3'>Annonces</h3>
          {artist.ads?.data?.map((ad, index) => (
            <p key={index}>{ad.title}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
