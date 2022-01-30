import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RouteProps } from 'react-router-dom';
import { BandCard } from '../components/band';
import { IBand } from '../types/types';
import { Bands } from '../data/data';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

type FormValues = {
  searchParams: string;
  city: string;
};

const BandsPage: FC<RouteProps> = ({}) => {
  const [bands, setBand] = useState(Bands);
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
      <h1 className='title has-text-centered'>Tous les Groupes</h1>
      <form onSubmit={handleSubmit(onSubmit)} method='post'>
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
        {bands.map((band, index) => (
          <BandCard key={index} band={band} />
        ))}
      </div>
    </>
  );
};

export default BandsPage;
