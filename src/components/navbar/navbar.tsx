import React, { FC } from 'react';
import Logo from '../../assets/images/logo/musicial_full_logo_black_on_white.png';
import {
  FaPlusSquare,
  FaEnvelope,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import Logout from './logout';
import { getUser, isLoggedIn } from '../../common/auth/auth-functions';
import { useAuthContext } from '../../common/auth/auth-context';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  const [isActive, setisActive] = React.useState(false);
  const { actions, currentUser } = useAuthContext();
  const loggedInUser = actions.getCurrentUser();

  return (
    <>
      <nav className='navbar' role='navigation' aria-label='main-navigation'>
        <div className='navbar-brand'>
          <a href='/'>
            <img src={Logo} alt='Musicial' width='250' />
          </a>
          <a
            role='button'
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={() => {
              setisActive(!isActive);
            }}
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>
        <div
          id='navbarBasicExample'
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div className='navbar-start'>
            <div className='navbar-item'>
              <a href='/ads'>
                <span className='ml-2'>Les Annonces</span>
              </a>
            </div>
            <div className='navbar-item'>
              <a href='/bands'>
                <span className='ml-2'>Les Groupes</span>
              </a>
            </div>
            <div className='navbar-item'>
              <a href='/musicians'>
                <span className='ml-2'>Les Musiciens</span>
              </a>
            </div>
          </div>
          <div className='navbar-end'>
            {isLoggedIn() ? (
              <div className='navbar-item'>
                <div className='navbar-item'>
                  <a href='#'>
                    <FaPlusSquare />
                    <span className='ml-2'>Nouvelle annonce</span>
                  </a>
                </div>
                <div className='navbar-item'>
                  <a href='#'>
                    <FaEnvelope />
                    <span className='ml-2'>Messages</span>
                  </a>
                </div>
                {/* <div className='navbar-item'>
                  <a href='#'>
                    <FaHeart />
                    <span className='ml-2'>Favoris</span>
                  </a>
                </div> */}
                <div className='navbar-item has-dropdown is-hoverable'>
                  <a className='navbar-link' href='#'>
                    <FaUserCircle />
                    <span className='ml-2'>{loggedInUser?.firstName}</span>
                  </a>
                  <div className='navbar-dropdown is-right'>
                    <Link
                      to={`/musicians/${loggedInUser?._id}`}
                      className='navbar-item'
                    >
                      Mon profil
                    </Link>
                    <Link
                      to={`/musicians/${loggedInUser?._id}`}
                      className='navbar-item'
                    >
                      Mon compte
                    </Link>
                    <a className='navbar-item' href='#'>
                      Mes groupes
                    </a>
                    <a className='navbar-item' href='#'>
                      Mes annonces
                    </a>
                    <hr className='navbar-divider' />
                    <Logout />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            {typeof isLoggedIn() === 'undefined' ? (
              <div className='navbar-item'>
                <div className='buttons'>
                  <a className='button is-primary' href='/login'>
                    <FaSignInAlt className='text-lg leading-lg text-white opacity-75' />
                    <span className='ml-2'>Connexion</span>
                  </a>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
