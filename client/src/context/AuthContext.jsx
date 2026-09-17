import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem('agrotechUser');
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Failed to parse saved user from localStorage:', err);
    return null;
  }
};

const getInitialToken = () => {
  try {
    return localStorage.getItem('agrotechToken') || null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('agrotechUser', JSON.stringify(user));
      localStorage.setItem('agrotechToken', token);
    } else {
      localStorage.removeItem('agrotechUser');
      localStorage.removeItem('agrotechToken');
    }
  }, [user, token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
