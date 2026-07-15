'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '@/utils/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authAPI.getMe();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth verification failed', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    router.push('/create');
  };

  const register = async (name, email, password) => {
    const data = await authAPI.register({ name, email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    router.push('/create');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
