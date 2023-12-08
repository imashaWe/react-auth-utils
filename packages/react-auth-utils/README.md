# react-auth-utils

[![npm version](https://img.shields.io/npm/v/react-auth-utils.svg)](https://www.npmjs.com/package/react-auth-utils)
[![npm downloads](https://img.shields.io/npm/dm/react-auth-utils.svg)](https://www.npmjs.com/package/react-auth-utils)
[![License](https://img.shields.io/npm/l/react-auth-utils.svg)](https://github.com/your-username/react-auth-utils/blob/main/LICENSE)

🔐 Simple and lightweight React authentication library for seamless user authentication in your projects.

## Features

- Easy integration with React applications
- Authentication state management
- Protected route components
- Token handling utilities

## Installation

You can install `react-auth-utils` using npm or yarn:

```bash
npm install react-auth-utils
# or
yarn add react-auth-utils
```

## Usage

### AuthProvider

Wrap your application with the AuthProvider to provide authentication state to your components.

```ts
import { AuthProvider } from 'react-auth-utils';

function App() {
  return <AuthProvider>{/* Your application components */}</AuthProvider>;
}
```

### useAuth

Use the useAuth hook to access authentication state in your components. The useAuth hook provides the following properties:

| Property          | Description                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `isAuthenticated` | A boolean indicating whether the user is authenticated.                                   |
| `user`            | The user object containing user information (optional, may be null if not authenticated). |
| `token`           | The authentication token (optional, may be null if not authenticated).                    |
| `signIn`          | A function to sign in the user.                                                           |
| `signOut`         | A function to sign out the user.                                                          |

#### Sign In

```ts
const { signIn } = useAuth();

const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
const expireIn2MinFromNow = Date.now() + 2 * 60 * 1000;
const fakeUser = {
  id: 1,
  username: 'admin',
  email: 'admin@admin.com',
};

signIn(fakeJWT, expireIn2MinFromNow, fakeUser);
```

### ProtectedRoute

Use the RequireAuth component to protect routes that require authentication.

```js
<RequireAuth unauthenticated={<Navigate to="/login" replace={true} />}>
  <ProtectedHomePage />
</RequireAuth>
```

### Contributing

We welcome contributions! Feel free to submit issues and pull requests.

<!-- ### License

This project is licensed under the MIT License - see the LICENSE file for details. -->
