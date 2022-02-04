import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RouteProps } from 'react-router-dom';
import { MusicianCard } from '../../components/musician';
import { Audio } from 'react-loader-spinner';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import { AllMusiciansQuery } from './queries/';

type FormValues = {
  searchParams: string;
  city: string;
};

const MusiciansPage: FC<RouteProps> = ({}) => {
  const { data, loading } = useQuery(AllMusiciansQuery);

  const musicians = data?.allMusicians;

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
      <h1 className='title has-text-centered'>Tou·te·s les Musicien·ne·s</h1>
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
      {loading || typeof musicians === 'undefined' ? (
        <div className='is-flex is-justify-content-center'>
          <Audio color='#29298d' height={40} width={40} />
        </div>
      ) : (
        <div>
          {musicians.data.map((musician, index) => (
            <MusicianCard key={index} musician={musician} />
          ))}
        </div>
      )}
    </>
  );
};

export default MusiciansPage;
