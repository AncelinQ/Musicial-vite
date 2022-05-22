import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { Link, RouteProps } from 'react-router-dom';

import { useAuthContext } from '../../common/auth/auth-context';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage: FC<RouteProps> = () => {
  const [passwordType, setPasswordType] = useState('text');
  const [emailInputClass, setEmailInputClass] = useState('input');
  const [passwordInputClass, setPasswordInputClass] = useState('input');
  const [showPassword, setShowPassword] = useState(true);
  const [passwordEyeColor, setPasswordEyeColor] = useState('black');
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { actions } = useAuthContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const login = actions.useLogin(values.email, values.password);

    login.catch(() => {
      setError(true);
      setEmailError(true);
      setPasswordError(true);
      setEmailInputClass('input is-danger');
      setPasswordInputClass('input is-danger');
    });
  };

  useEffect(() => {
    passwordType === 'text'
      ? (setPasswordType('password'), setPasswordEyeColor('black'))
      : (setPasswordType('text'), setPasswordEyeColor('#57BA7A'));
  }, [showPassword]);

  return (
    <div className='container'>
      <h1 className='title is-1 has-text-centered'>Connexion</h1>
      <div className='columns'>
        <div className='column'>
          <h3 className='title is-3 has-text-centered'>Vous avez un compte</h3>

          <form onSubmit={handleSubmit(onSubmit)} method='get'>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  className={emailInputClass}
                  type='email'
                  placeholder='Email'
                  autoComplete='email'
                  {...register('email', { required: true })}
                  onFocus={() => {
                    setEmailError(false);
                    setEmailInputClass('input');
                  }}
                />
                <span className='icon is-small is-left'>
                  <FaEnvelope />
                </span>
                {emailError && (
                  <span className='icon is-small is-right'>
                    <FaExclamationTriangle
                      fill='hsl(348, 100%, 61%)'
                      stroke='hsl(348, 100%, 61%)'
                    />
                  </span>
                )}
                {errors.email && (
                  <span className='icon is-small is-right'>
                    <FaExclamationTriangle
                      fill='hsl(348, 100%, 61%)'
                      stroke='hsl(348, 100%, 61%)'
                    />
                  </span>
                )}
              </div>
              {errors.email && (
                <p className='help is-danger'>Veuillez renseigner ce champs</p>
              )}
            </div>
            <div className='field'>
              <label className='label'>
                Mot de passe{' '}
                <FaEye
                  color={passwordEyeColor}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  id='loginPassword'
                  className={passwordInputClass}
                  type={passwordType}
                  placeholder='Mot de passe'
                  {...register('password', { required: true })}
                  autoComplete='current-password'
                  onFocus={() => {
                    setPasswordError(false);
                    setPasswordInputClass('input');
                  }}
                />
                <span className='icon is-small is-left'>
                  <FaLock />
                </span>
                {passwordError && (
                  <span className='icon is-small is-right'>
                    <FaExclamationTriangle
                      fill='hsl(348, 100%, 61%)'
                      stroke='hsl(348, 100%, 61%)'
                    />
                  </span>
                )}
                {errors.password && (
                  <span className='icon is-small is-right'>
                    <FaExclamationTriangle
                      fill='hsl(348, 100%, 61%)'
                      stroke='hsl(348, 100%, 61%)'
                    />
                  </span>
                )}
              </div>
              {errors.password && (
                <p className='help is-danger'>Veuillez renseigner ce champs</p>
              )}
            </div>
            <div className='control'>
              <button className='button is-link'>Connexion</button>
            </div>
            {error && (
              <h4 className='help is-danger is-centered has-text-centered title is-6'>
                Identifiant ou mot de passe incorrect
              </h4>
            )}
          </form>
        </div>
      </div>
      <div className='has-text-centered'>
        <Link to={`/register`} className='button is-primary is-large'>
          Créer un compte
        </Link>
      </div>
    </div>
  );
};

// const LoginPage: FC = () => {
//   return (
//     <AuthContextProvider>
//       <LoginPageContent />
//     </AuthContextProvider>
//   );
// };

export default LoginPage;
