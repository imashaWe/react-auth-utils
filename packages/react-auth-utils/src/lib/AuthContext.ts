/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { AuthContextInterface } from './types';

export const AuthContext = createContext<AuthContextInterface<any>>({
  authState: null,
  signIn: () => {},
  signOut: () => {},
});
