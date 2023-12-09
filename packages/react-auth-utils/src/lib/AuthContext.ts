/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { AuthContextInterface } from './types';

const AuthContext = createContext<AuthContextInterface<any>>({
  authState: null,
  signIn: () => {},
  signOut: () => {},
  updateUser: () => {},
});

export default AuthContext;
