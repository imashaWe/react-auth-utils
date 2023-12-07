/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

export interface AuthState<T = any> {
  token: string;
  expiresAt?: number;
  isRemembered: boolean;
  user?: T;
}

export interface SignInOption {
  /**
   * @default false
   * To remember user session in cookies
   * */
  isRemembered?: boolean;
}

export interface AuthContextInterface<T> {
  authState: AuthState<T> | null;
  /**
   * Sign in with JWT token
   * @param token - JWT token
   * @param expiresAt - JWT token expiration time
   * @param user - User object
   * @param isRemembered - If true, the token will be stored in Cookies
   * @returns void
   */
  signIn: (
    token: string,
    expiresAt?: number,
    user?: T,
    options?: SignInOption
  ) => void;

  /**
   * Sign out
   * @returns void
   */
  signOut: () => void;

  /**
   * Update user object
   * @param user - User object
   * @returns void
   * */
  updateUser: (user: T) => void;
}

/**
 * Represents the props for an authentication provider component.
 * @template T - The type of the authentication state.
 */
export interface AuthProviderProps<T> {
  children: React.ReactNode;
  /**
   * @function  - A callback function that is called when the authentication state changes.
   * @param authState - The authentication state.
   * @returns void
   * @default undefined
   * @example
   * ```tsx
   * const onAuthStateChange = (authState: AuthState | null) => {
   *  console.log(authState);
   * }
   * ```
   */
  onAuthStateChange?: (authState: AuthState<T> | null) => void;
}
