import { FC, useEffect, useState } from 'react';
import { set, SubmitHandler, useForm } from 'react-hook-form';
import { RouteProps } from 'react-router-dom';
import { AdCard } from '../../components/ad';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { Audio } from 'react-loader-spinner';
import { Ad } from '../../common/types/types';
import { useQuery } from '@apollo/client';
import { AllBandAdsQuery, AllMusicianAdsQuery } from './queries';
import SearchBar from '../../components/searchBar/search-bar';

const AdsPage: FC<RouteProps> = ({}) => {
  const [adType, setAdType] = useState<string>('');
  const { data: bandAdsData, loading: bandAdsLoading } =
    useQuery(AllBandAdsQuery);
  const { data: musicianAdsData, loading: musicianAdsLoading } =
    useQuery(AllMusicianAdsQuery);

  const bandAds = bandAdsData?.allBandAds;
  const musicianAds = musicianAdsData?.allMusicianAds;

  useEffect(() => {});

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
      <SearchBar />

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
