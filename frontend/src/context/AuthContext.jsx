import { useState } from "react";

import { AuthContext } from './AuthContextInstance';
import { fetchUser } from "../services/api/authApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserContext = async () => {
    const user = await fetchUser();
    setUser(user);
  };

  const logoutUserContext = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUserContext, logoutUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};



