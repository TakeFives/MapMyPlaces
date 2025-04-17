import { useState, useEffect } from "react";

import { AuthContext } from './AuthContextInstance';
import { fetchUser } from "../services/api/authApi";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserContext = async () => {
    const user = await fetchUser();
    console.log('AuthProvider user', user);
    setUser(user);
  };

  const logoutUserContext = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log('AuthProvider useEffect');
    setUserContext();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUserContext, logoutUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};



