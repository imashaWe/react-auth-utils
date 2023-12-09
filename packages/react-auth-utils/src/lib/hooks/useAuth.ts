import { useContext } from 'react';
import { AuthContextInterface } from '../types';
import AuthContext from '../AuthContext';

const useAuth = <T>() => {
  const { authState, signIn, signOut } =
    useContext<AuthContextInterface<T>>(AuthContext);

  const isAuthenticated = !!authState;
  const user = authState?.user;
  const token = {
    token: authState?.token,
    expiresAt: authState?.expiresAt,
  };

  return { isAuthenticated, user, token, signIn, signOut };
};

export default useAuth;
