import React, { FC, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { cleanUp } from '../../common/auth/auth-functions';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import {
  AuthContext,
  AuthContextProvider,
  useAuthContext,
} from '../../common/auth/auth-context';
import { LogoutQuery } from '../../common/auth';

// const logout = gql`
//   mutation logout {
//     logoutUser
//   }
// `;

const Logout = () => {
  const navigate = useNavigate();
  const [logoutUser, { client, error, data }] = useMutation(LogoutQuery);
  // const { actions } = useAuthContext();

  const handleClick = () => {
    logoutUser();
    // actions.useLogout();
    // When there is a response, navigate to the home page
    // if (data.hasOwnProperty('logoutUser')) {
    // Remove token and user related data
    cleanUp();
    // Clear Apollo cache

    client.clearStore();
    navigate('/');
    // }
    if (error) throw new Error(error.message + ' : ' + error.cause);
  };

  return (
    <>
      <a
        className='navbar-item'
        href='/'
        onClick={(event) => {
          event.preventDefault();
          handleClick();
        }}
      >
        <div className='button is-danger is-light'>
          <span className='mr-2'>Déconnexion</span>
          <FaSignOutAlt className='text-lg leading-lg text-white opacity-75' />
        </div>
      </a>
    </>
  );
};

// const Logout: FC = () => {
//   return (
//     <AuthContextProvider>
//       <LogoutContent />
//     </AuthContextProvider>
//   );
// };

export default Logout;
