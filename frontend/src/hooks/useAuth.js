import { useContext } from "react";
import { AuthContext } from "../context/AuthContextInstance";

export const useAuth = () => {
  return useContext(AuthContext);
};
