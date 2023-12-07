import { FC, PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuth';

interface RequireAuthProps {
  unauthenticated?: React.ReactNode;
}

export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({
  children,
  unauthenticated,
}) => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);
  if (isAuthenticated) {
    children;
  }

  if (!isAuthenticated && unauthenticated) {
    return unauthenticated;
  }

  return null;
};
