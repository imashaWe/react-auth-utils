import { FC, PropsWithChildren } from 'react';
import useAuth from '../hooks/useAuth';

interface RequireAuthProps {
  unauthenticated?: React.ReactNode;
}

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({
  children,
  unauthenticated,
}) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  }

  if (!isAuthenticated && unauthenticated) {
    return unauthenticated;
  }

  return null;
};

export default RequireAuth;
