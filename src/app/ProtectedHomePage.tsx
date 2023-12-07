import { useEffect, useState } from 'react';
import { useAuth } from 'react-auth-utils';

export default function ProtectedHomePage() {
  const { token, signOut } = useAuth();
  const [expireInText, setExpireInText] = useState('');

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const expireIn = (token.expiresAt ?? 0) - now;
      if (expireIn) {
        const minutes = Math.floor(expireIn / 1000 / 60);
        const seconds = Math.floor((expireIn / 1000) % 60);

        setExpireInText(`${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token?.expiresAt]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-2xl">Protected Home Page</h1>

      <p className="text-gray-500">You will be logout in {expireInText}</p>

      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
