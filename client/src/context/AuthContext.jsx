import { fetchCurrentUser, loginUser, logoutUser } from "@/api/auth";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);

  // verify user on reload
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetchCurrentUser();
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const values = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuthContext ()  {
  return useContext(AuthContext);
};

export { useAuthContext };
