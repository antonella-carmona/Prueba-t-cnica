import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//useContext para manejar el estado global de la autenticación en la aplicación.
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setAuth({
        isAuthenticated: true,
        token,
      });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("jwt", token);
    setAuth({
      isAuthenticated: true,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuth({
      isAuthenticated: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
