import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import LoginPage from './app/LoginPage';
import ProtectedHomePage from './app/ProtectedHomePage';

import { RequireAuth, AuthProvider } from 'react-auth-utils';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth unauthenticated={<Navigate to="/login" replace={true} />}>
        <ProtectedHomePage />
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
