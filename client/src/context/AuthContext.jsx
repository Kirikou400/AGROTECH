import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const savedUser = JSON.parse(localStorage.getItem('agrotechUser') || 'null');
const savedToken = localStorage.getItem('agrotechToken');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(savedUser);
  const [token, setToken] = useState(savedToken);

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
