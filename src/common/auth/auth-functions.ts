import { User, Role } from '../types/types';
import Cookies from 'js-cookie';

const userKey = 'mscl';

const tokenKey = 'mscltk';

export const loginRoute = '/login';

export const isBrowser = () => typeof window !== 'undefined';

export const setToken = (token: string) => Cookies.set(tokenKey, token);

export const getToken = () => Cookies.get(tokenKey);

export const getUser = () => {
  let user: User =
    isBrowser() && localStorage.getItem(userKey)
      ? JSON.parse(localStorage.getItem(userKey) || 'null')
      : {};
  return user;
};

export const setUser = (user: User) =>
  localStorage.setItem(userKey, JSON.stringify(user));

export const isUser = () => {
  const user: User = getUser();
  return user.role === Role.User;
};

export const isAdmin = () => {
  const user: User = getUser();
  return user.role === Role.Admin;
};

export const isLoggedIn = () => {
  const token = getToken();
  return token;
};

export const cleanUp = () => {
  Cookies.remove(tokenKey);
  localStorage.removeItem(userKey);
};
