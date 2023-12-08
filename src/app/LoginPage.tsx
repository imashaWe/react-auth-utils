import { useState } from 'react';
import { useAuth } from 'react-auth-utils';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();
  const navigator = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
      const expireIn2MinFromNow = Date.now() + 2 * 60 * 1000;
      const fakeUser = {
        id: 1,
        username: 'admin',
        email: 'admin@admin.com',
      };

      signIn(fakeJWT, expireIn2MinFromNow, fakeUser);

      navigator('/');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col w-96">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500">Please login to continue</p>
        </div>
        <div className="flex flex-col mt-8 border-l-4 border-yellow-300 bg-yellow-50 p-2">
          <p>Hint: username = admin | password = admin</p>
        </div>

        <div className="flex flex-col mt-8">
          <label className="text-sm font-bold">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <label className="text-sm font-bold mt-4">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
