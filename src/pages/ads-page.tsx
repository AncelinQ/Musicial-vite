import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RouteProps } from 'react-router-dom';
import { AdCard } from '../components/ad';
import { IAd } from '../types/types';
import { Ads } from '../data/data';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

type FormValues = {
  searchParams: string;
  city: string;
};

const AdsPage: FC<RouteProps> = ({}) => {
  const [ads, setAd] = useState(Ads);
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
      <form onSubmit={handleSubmit(onSubmit)} method='get'>
        <div className='control has-text-centered'>
          <label className='radio'>De Groupes </label>
          <input
            type='radio'
            name='AdType'
            id='groupAdType'
            value='groupAdType'
            checked
          />
          <label className='radio'>De Musiciens</label>
          <input
            type='radio'
            name='AdType'
            id='musicianAdType'
            value='musicianAdType'
          />
        </div>
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
      <div>
        {ads.map((ad, index) => (
          <AdCard key={index} ad={ad} />
        ))}
      </div>
    </>
  );
};

export default AdsPage;
