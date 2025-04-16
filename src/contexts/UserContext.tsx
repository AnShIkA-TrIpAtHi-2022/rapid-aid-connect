import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export type UserRole = 'donor' | 'volunteer' | 'responder';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set the base URL for axios
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

  // Check if user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(data.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      const { token, user: userData } = data;

      // Store token and user data
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', {
        email,
        password,
        name,
        role,
      });
      const { token, user: userData } = data;

      // Store token and user data
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};