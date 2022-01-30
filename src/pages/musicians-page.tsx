import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RouteProps } from 'react-router-dom';
import { UserCard } from '../components/user';
import { IUser } from '../types/types';
import { Users } from '../data/data';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

type FormValues = {
  searchParams: string;
  city: string;
};

const MusiciansPage: FC<RouteProps> = ({}) => {
  const [users, setUser] = useState(Users);
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
      <div>
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </>
  );
};

export default MusiciansPage;
