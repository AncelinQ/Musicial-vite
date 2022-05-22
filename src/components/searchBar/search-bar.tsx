import { useLazyQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { set, SubmitHandler, useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import {
  BandAdsByCityQuery,
  BandsByCityQuery,
  MusicianAdsByCityQuery,
  MusiciansByCityQuery,
} from './queries';

const queries = {
  BandsByCity: BandsByCityQuery,
  MusiciansByCity: MusiciansByCityQuery,
  BandAdsByCity: BandAdsByCityQuery,
  MusicianAdsByCity: MusicianAdsByCityQuery,
};

type FormValues = {
  searchParams: string;
  city: string;
};

// interface QueryProps {
//   isAd: Boolean;
//   resourceType: String;
//   isByCity: Boolean;
//   query?: (queryVariables: Object) => void;
// }

const SearchBar: FC = () => {
  const [ad, setAd] = useState<String>();
  const [city, setCity] = useState<String>();

  // isAd === true ? setAd('Ad') : setAd('');
  // isByCity === true ? setCity('ByCity') : setCity('');

  // const [getBandsByCity, { data: resourceData, loading, error }] =
  //   useLazyQuery();

  // const data = resourceData || [];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let city = data.city.toLowerCase();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    // query({ variables: { city: city } });
  };
  return (
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
        <button className='submit button is-info control '>C'est parti</button>
      </div>
    </form>
  );
};

export default SearchBar;
