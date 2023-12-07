/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

export interface AuthState<T = any> {
  token: string;
  expiresAt?: number;
  isRemembered: boolean;
  user?: T;
}

export interface SignInOption {
  isRemembered?: boolean;
}

export interface AuthContextInterface<T> {
  authState: AuthState<T> | null;
  signIn: (
    token: string,
    expiresAt?: number,
    user?: T,
    options?: SignInOption
  ) => void;
  signOut: () => void;
}

export interface AuthProviderProps<T> {
  children: React.ReactNode;
  onAuthStateChange?: (authData: AuthState<T> | null) => void;
}
