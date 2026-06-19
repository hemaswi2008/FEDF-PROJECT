import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const LOCAL_KEY = 'review_user_v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(LOCAL_KEY, JSON.stringify(user));
      else localStorage.removeItem(LOCAL_KEY);
    } catch (e) {}
  }, [user]);

  const login = (u) => setUser(u);
  const logout = () => setUser(null);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
