import { useEffect, useState } from 'react';
import {
  AuthContextInterface,
  AuthState,
  SignInOption,
  AuthProviderProps,
} from './types';
import AuthContext from './AuthContext';
import Cookies from 'js-cookie';

const AUTH_STATE_KEY = 'AUTH_STATE';

const AuthProvider = <T,>({
  children,
  onAuthStateChange,
}: AuthProviderProps<T>) => {
  const [authState, setAuthState] = useState<AuthState<T> | null>(null);
  const [loaded, setLoaded] = useState(false);

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

  const signOut = () => {
    setAuthState(null);
    localStorage.removeItem(AUTH_STATE_KEY);
    Cookies.remove(AUTH_STATE_KEY);
  };

  const updateUser = (user: T) => {
    setAuthState({ ...authState!, user: user });
  };

  const value: AuthContextInterface<T> = {
    authState,
    signIn,
    signOut,
    updateUser,
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

  useEffect(() => {
    if (!authState) return;

    if (authState?.isRemembered) {
      Cookies.set(AUTH_STATE_KEY, JSON.stringify(authState));
    } else {
      localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authState));
    }
  }, [authState]);

  useEffect(() => {
    const authStateFromLocalStorage = localStorage.getItem(AUTH_STATE_KEY);

    if (authStateFromLocalStorage) {
      setAuthState(JSON.parse(authStateFromLocalStorage));
    } else {
      const authStateFromCookies = Cookies.get(AUTH_STATE_KEY);

      if (authStateFromCookies) {
        setAuthState(JSON.parse(authStateFromCookies));
      }
    }

    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
