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

const Navbar: FC = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className='navbar' role='navigation' aria-label='main-navigation'>
        <div className='navbar-brand'>
          <a href='/'>
            <img src={Logo} alt='Musicial' width='250' />
          </a>
          <a
            href='#'
            role='button'
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>
        <div className='navbar-menu'>
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
            <div className='navbar-item'>
              <a href='#'>
                <FaHeart />
                <span className='ml-2'>Favoris</span>
              </a>
            </div>
            <div className='navbar-item has-dropsown is-hoverable'>
              <a className='navbar-link' href='#'>
                <FaUserCircle />
                <span className='ml-2'>Profil</span>
              </a>
              <div className='navbar-dropdown'>
                <a className='navbar-item' href='#'>
                  Mon compte
                </a>
                <a className='navbar-item' href='#'>
                  Mes groupes
                </a>
                <a className='navbar-item' href='#'>
                  Mes annonces
                </a>
                <hr className='navbar-divider' />
                <a className='navbar-item'>
                  <div className='button is-danger is-light'>
                    <span className='mr-2'>Déconnexion</span>
                    <FaSignOutAlt className='text-lg leading-lg text-white opacity-75' />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className='navbar-item'>
            <div className='buttons'>
              <a className='button is-primary' href='/login'>
                <FaSignInAlt className='text-lg leading-lg text-white opacity-75' />
                <span className='ml-2'>Connexion</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
