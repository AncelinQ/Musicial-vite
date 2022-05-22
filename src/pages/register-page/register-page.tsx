import { gql } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaLock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { RouteProps } from 'react-router-dom';

const mutation = gql`
  mutation register($email: String!, $password: String!, $role: String!) {
    register(data: { email: $email, password: $password, role: $role }) {
      _id
      email
      role
    }
  }
`;

type FormValues = {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  age?: number;
  gender?: number;
  city?: string;
  description?: string;
  picture?: string;
  experience?: number;
  objective?: number;
  styles?: string[];
  instruments?: string[];
  artistRef?: string[];
  songRef?: string[];
  websiteLink?: string[];
  audioLink?: string[];
  videoLink?: string[];
  socialLink?: string[];
  createBand?: boolean;
};

const RegisterPage: FC<RouteProps> = () => {
  const [passwordType, setPasswordType] = useState('text');
  const [showPassword, setShowPassword] = useState(true);
  const [passwordEyeColor, setPasswordEyeColor] = useState('black');
  const [confirmationPasswordEyeColor, setConfirmationPasswordEyeColor] =
    useState('black');
  const [confirmationPasswordType, setConfirmationPasswordType] =
    useState('text');
  const [confirmationShowPassword, setConfirmationShowPassword] =
    useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [formStep, setFormStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    data.password === data.confirmPassword
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  };

  useEffect(() => {
    passwordType === 'text'
      ? (setPasswordType('password'), setPasswordEyeColor('black'))
      : (setPasswordType('text'), setPasswordEyeColor('#57BA7A'));
  }, [showPassword]);

  useEffect(() => {
    confirmationPasswordType === 'text'
      ? (setConfirmationPasswordType('password'),
        setConfirmationPasswordEyeColor('black'))
      : (setConfirmationPasswordType('text'),
        setConfirmationPasswordEyeColor('#57BA7A'));
  }, [confirmationShowPassword]);

  return (
    <div className='container'>
      <h1 className='title is-1 has-text-centered'>Inscription</h1>
      <div className='columns'>
        <div className='column'>
          <form onSubmit={handleSubmit(onSubmit)} method='post'>
            <div className='field'>
              <label className='label'>Prénom</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Prénom'
                  {...register('firstName', { required: true })}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Nom</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Nom'
                  {...register('lastName', { required: true })}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Email</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  className='input'
                  type='email'
                  placeholder='Email'
                  {...register('email', { required: true })}
                />
                <span className='icon is-small is-left'>
                  <FaEnvelope />
                </span>
                {errors.email && (
                  <span className='icon is-small is-right'>
                    <FaExclamationTriangle />
                  </span>
                )}
              </div>
              {errors.email && (
                <p className='help is-danger'>Veuillez remplir ce champs</p>
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
                  className='input'
                  type={passwordType}
                  placeholder='Mot de passe'
                  {...register('password', {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
                  })}
                />
                <span className='icon is-small is-left'>
                  <FaLock />
                </span>
                {errors.password && (
                  <span className='icon is-small is-right'>
                    <FaExclamationTriangle />
                  </span>
                )}
              </div>
              {errors.password?.type === 'required' && (
                <p className='help is-danger'>Veuillez remplir ce champs</p>
              )}
              {errors.password?.type === 'pattern' && (
                <div className='content help is-danger'>
                  <p>Le mot de passe doit contenir au moins :</p>
                  <ul>
                    <li>8 caractères</li>
                    <li>1 lettre minuscule</li>
                    <li>1 lettre majuscule</li>
                    <li>1 chiffre</li>
                    <li>1 caractère spécial (&, $, #, ...)</li>
                  </ul>
                </div>
              )}
            </div>
            <div className='field'>
              <label className='label'>
                Confirmation du mot de passe{' '}
                <FaEye
                  color={confirmationPasswordEyeColor}
                  onClick={() =>
                    setConfirmationShowPassword(!confirmationShowPassword)
                  }
                />
              </label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  id='loginPassword'
                  className='input'
                  type={confirmationPasswordType}
                  placeholder='Mot de passe'
                  {...register('confirmPassword', { required: true })}
                />
                <span className='icon is-small is-left'>
                  <FaLock />
                </span>
                {errors.confirmPassword && (
                  <span className='icon is-small is-right'>
                    <FaExclamationTriangle />
                  </span>
                )}
              </div>
              {errors.confirmPassword && (
                <p className='help is-danger'>Veuillez remplir ce champs</p>
              )}

              {passwordMatch === false && (
                <p className='help is-danger'>
                  Les mots de passe sont différents
                </p>
              )}
            </div>
            {/* <div className='field'>
              <label className='label'>Ville</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  id='city'
                  className='input'
                  type='text'
                  placeholder='Ville'
                  {...register('city', { required: true })}
                />
                <span className='icon is-small is-left'>
                  <FaMapMarkerAlt />
                </span>
              </div>
              {errors.city && (
                <p className='help is-danger'>Veuillez remplir ce champs</p>
              )}
            </div> */}
            {/* <div className='field'>
              <label className='label'>Je suis</label>
              <div className='control'>
                <div className='select'>
                  <select {...register('gender', { required: true })}>
                    <option value={1}>Un homme</option>
                    <option value={2}>Une femme</option>
                    <option value={3}>Je ne veux pas le dire</option>
                  </select>
                </div>
              </div>
            </div> */}
            {/* <div className='field'>
              <label className='label'>Expérience</label>
              <div className='control'>
                <div className='select'>
                  <select {...register('experience', { required: true })}>
                    <option value={1}>Débutant</option>
                    <option value={2}>Confirmé</option>
                    <option value={3}>Expert</option>
                  </select>
                </div>
              </div>
              {errors.experience && (
                <p className='help is-danger'>Veuillez remplir ce champs</p>
              )}
            </div>
            <div className='field'>
              <label className='label'>Objectifs</label>
              <div className='control'>
                <div className='select'>
                  <select {...register('objective', { required: true })}>
                    <option value={1}>Amateur</option>
                    <option value={2}>Semi-Pro</option>
                    <option value={3}>Pro</option>
                  </select>
                </div>
              </div>
              {errors.objective && (
                <p className='help is-danger'>Veuillez remplir ce champs</p>
              )}
            </div> */}

            {/* <div className='field'>
              <label className='label'>Description</label>
              <div className='control'>
                <textarea
                  className='textarea'
                  placeholder='Textarea'
                ></textarea>
              </div>
            </div> */}

            <div className='field is-grouped'>
              <div className='control'>
                <button className='button is-link'>Envoyer</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
