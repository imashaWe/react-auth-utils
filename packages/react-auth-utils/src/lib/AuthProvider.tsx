import { useEffect, useState } from 'react';
import {
  AuthContextInterface,
  AuthState,
  SignInOption,
  AuthProviderProps,
} from './types';
import { AuthContext } from './AuthContext';

export const AuthProvider = <T,>({
  children,
  onAuthStateChange,
}: AuthProviderProps<T>) => {
  const [authState, setAuthState] = useState<AuthState<T> | null>(null);

  const signIn = (
    token: string,
    expiresAt?: number,
    user?: T,
    { isRemembered = false }: SignInOption = {
      isRemembered: false,
    }
  ) => {
    setAuthState({
      token,
      expiresAt: expiresAt,
      user,
      isRemembered,
    });
  };

  /**
   * Sign out
   */
  const signOut = () => {
    setAuthState(null);
  };

  const value: AuthContextInterface<T> = {
    authState,
    signIn,
    signOut,
  };

  useEffect(() => {
    if (onAuthStateChange) {
      onAuthStateChange(authState);
    }

    return () => {
      if (onAuthStateChange) {
        onAuthStateChange(null);
      }
    };
  }, [authState, onAuthStateChange]);

  useEffect(() => {
    if (authState?.expiresAt) {
      const timeout = setTimeout(() => {
        signOut();
      }, authState.expiresAt - Date.now());

      return () => {
        clearTimeout(timeout);
      };
    }

    return () => {};
  }, [authState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
