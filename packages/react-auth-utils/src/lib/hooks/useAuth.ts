import { useContext } from 'react';
import { AuthContextInterface } from '../types';
import { AuthContext } from '../AuthContext';

export const useAuth = <T>() => {
  const { authState, signIn, signOut } =
    useContext<AuthContextInterface<T>>(AuthContext);

  const isAuthenticated = authState !== null;
  const user = authState?.user;
  const token = authState?.token;

  return { authState, isAuthenticated, user, token, signIn, signOut };
};
