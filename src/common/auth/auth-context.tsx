import {
  ApolloError,
  gql,
  MutationTuple,
  TypedDocumentNode,
} from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useState } from 'react';
import { AuthPayload, User } from '../types/types';
import FaunaTokenManager from '../utils/fauna-token-manager';
import { useContext } from 'react';
import { checkDefined } from '../utils/type-checks';
import {
  CurrentUserQuery,
  LoginQuery,
  RegisterQuery,
  LogoutQuery,
} from './index';
import {
  cleanUp,
  getToken,
  getUser,
  setToken,
  setUser,
} from './auth-functions';
import { useNavigate } from 'react-router-dom';

// Context value structure
interface AuthContextValue {
  currentUser: User | undefined;
  actions: {
    // useRegister: (
    //   email: string,
    //   firstName: string,
    //   lastName: string,
    //   password: string
    // ) => User;
    useLogin: (email: string, password: string) => Promise<void>;
    // useLogout: () => void;
    getCurrentUser: () => User | null | undefined;
  };
}

// Context creation
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

// Use Context hook
export const useAuthContext = (): AuthContextValue =>
  checkDefined(
    useContext(AuthContext),
    'AuthContext should not be undefined. Did you forget to wrap your component inside a Provider?'
  );

// Context provider
export const AuthContextProvider: FC = ({ children }) => {
  /**
   * SECTION Apollo hooks
   */
  const [currentUser, setCurrentUser] = useState<User>();
  const [register, { data: registerData, error: registerError }] =
    useMutation(RegisterQuery);
  const [login, { data: loginData, error: loginError }] =
    useMutation(LoginQuery);
  const [logout, { client, error: logoutError, data: logoutData }] =
    useMutation(LogoutQuery);
  const navigate = useNavigate();

  // Send request using Apollo client
  const faunaTokenManager = new FaunaTokenManager();

  const getCurrentUser = () => {
    const { data, loading } = useQuery(CurrentUserQuery);
    const user = data?.currentUser;
    const token = getToken();

    if (token !== undefined) {
      if (typeof user === 'undefined' || user === null) {
        // cleanUp();
      }
    }
    return user;
  };

  // Mutation which allows to register an account
  const useRegister = (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) => {
    register({
      variables: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      },
    });
    if (registerError) {
      throw new Error(`Submission error ! ${registerError.message}`);
    }

    if (typeof registerData === 'undefined') {
      throw new Error(`Submission error, the user is  undefined !`);
    }

    if (registerData === null) {
      throw new Error(`Submission error, the user is null !`);
    }

    // faunaTokenManager.set(registerData.registerUser.token);
    // usersService.set(
    //   registerData.registerUser.token,
    //   registerData.registerUser.adminUser
    // );

    return registerData.registeredUser;
  };

  // Mutation which allows to register an account
  const useLogin = (email: string, password: string) =>
    login({
      variables: { email: email, password: password },
    })
      .then((response) => {
        const userToken = response.data?.loginUser.token;
        const user = response.data?.loginUser.adminUser;

        if (
          typeof userToken !== 'undefined' &&
          typeof user !== 'undefined' &&
          user !== null
        ) {
          setToken(userToken);
          setCurrentUser(user);
          if (getToken() === userToken) {
            navigate(`/musicians/${user._id}`);
          }
        }
      })
      .catch((error) => {
        throw new Error(`Submission error ! ${error.message} : ${error.cause}`);
      });

  // Mutation which allows to log out from the application
  const useLogout = () => {
    logout();

    if (logoutError) throw new Error(logoutError.message);

    // if (typeof logoutData === 'undefined') {
    //   throw new Error('Logout returned an undefined response');
    // }
    if (logoutData === null) {
      throw new Error('Logout returned a null response');
    }
    // When there is a response, navigate to the home page
    // Remove token and user related data

    const token = faunaTokenManager.get();
    faunaTokenManager.reset();

    cleanUp();
    // Clear Apollo cache
    client.clearStore();
    // navigate('/');
  };

  // Pack data and actions to dispatch through components
  let value = {
    currentUser,
    actions: {
      getCurrentUser,
      useLogin,
    },
  };

  // Template
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
