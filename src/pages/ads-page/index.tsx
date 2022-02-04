import { FC, useEffect, useState } from 'react';
import { set, SubmitHandler, useForm } from 'react-hook-form';
import { RouteProps } from 'react-router-dom';
import { AdCard } from '../../components/ad';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { Audio } from 'react-loader-spinner';
import { Ad } from '../../types/api';
import { useQuery } from '@apollo/client';
import { AllBandAdsQuery, AllMusicianAdsQuery } from './queries';

type FormValues = {
  searchParams: string;
  city: string;
};

const AdsPage: FC<RouteProps> = ({}) => {
  const [adType, setAdType] = useState<string>('');
  const { data: bandAdsData, loading: bandAdsLoading } =
    useQuery(AllBandAdsQuery);
  const { data: musicianAdsData, loading: musicianAdsLoading } =
    useQuery(AllMusicianAdsQuery);

  const bandAds = bandAdsData?.allBandAds;
  const musicianAds = musicianAdsData?.allMusicianAds;

  useEffect(() => {});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <>
      <h1 className='title has-text-centered'>Toutes les Annonces</h1>
      <div className='control has-text-centered'>
        <label className='radio'>De Groupes </label>
        <input
          type='radio'
          name='AdType'
          id='bandAdType'
          value='band'
          checked={adType === 'band'}
          onChange={(e) => setAdType(e.target.value)}
        />
        <label className='radio'>De Musiciens</label>
        <input
          type='radio'
          name='AdType'
          id='musicianAdType'
          value='musician'
          checked={adType === 'musician'}
          onChange={(e) => setAdType(e.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} method='get'>
        <div className='field is-grouped'>
          <div className='control has-icons-left is-expanded'>
            <label className='label is-hidden'>Recherche</label>
            <input
              className='input'
              id='searchQuery'
              type='text'
              placeholder='Instruments, styles,...'
              {...register('searchParams')}
            />
            <span className='icon is-small is-left'>
              <FaSearch />
            </span>
          </div>
          <div className='control has-icons-left'>
            <label className='label is-hidden'>Ville</label>
            <input
              className='input'
              id='city'
              type='text'
              placeholder='Ville'
              {...register('city')}
            />
            <span className='icon is-small is-left'>
              <FaMapMarkerAlt />
            </span>
          </div>
          <button className='submit button is-info control '>
            C'est parti
          </button>
        </div>
      </form>

      {adType === 'band' && (
        <div>
          {bandAdsLoading || typeof bandAds === 'undefined' ? (
            <div className='is-flex is-justify-content-center'>
              <Audio color='#29298d' height={40} width={40} />
            </div>
          ) : (
            <div>
              <h2> Les Annonces de Groupes</h2>
              {bandAds.data.map((ad) => (
                <AdCard key={Number(ad._id)} ad={ad} />
              ))}
            </div>
          )}
        </div>
      )}
      {adType === 'musician' && (
        <div>
          {musicianAdsLoading || typeof musicianAds === 'undefined' ? (
            <div className='is-flex is-justify-content-center'>
              <Audio color='#29298d' height={40} width={40} />
            </div>
          ) : (
            <div>
              <h2> Les Annonces de Musiciens</h2>
              {musicianAds.data.map((ad, index) => (
                <AdCard key={index} ad={ad} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdsPage;
