import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { AuthContext } from './AuthContextInstance';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    Cookies.set("accessToken", token);
    setUser({ token });
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


