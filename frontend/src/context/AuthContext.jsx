import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Set user data with firstname
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
