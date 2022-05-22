import { FC } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { useQuery } from '@apollo/client';
import { BandByIDQuery } from './queries';
import { useAuthContext } from '../../common/auth/auth-context';

const BandAdSinglePage: FC<RouteProps> = () => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams();
  const { actions } = useAuthContext();

  if (typeof id === 'undefined') {
    throw new Error('URL Parameter "id" is missing.');
  }

  const { data, loading, error } = useQuery(BandByIDQuery, {
    variables: { id },
  });

  const ad = data?.findBandAdByID;

  const loggedInUser = actions.getCurrentUser()?._id === ad?.author?._id;

  if (error) console.log(error.message + ' : ' + error.cause);

  return (
    <>
      {loading || typeof ad === 'undefined' ? (
        <div className='is-flex is-justify-content-center'>
          <Audio color='#29298d' height={40} width={40} />
        </div>
      ) : (
        <div>
          {loggedInUser && (
            <div className='buttons is-right'>
              <button type='button' className='button is-primary'>
                Edit
              </button>
            </div>
          )}
          <h1 className='title is-1 has-text-centered'>
            <p>{ad.title}</p>
          </h1>
          <div className='has-text-centered'>
            <h3 className='title is-3'>
              {' '}
              <a href={`/bands/${ad.author?._id}`}>{ad.author?.name}</a>
            </h3>
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
