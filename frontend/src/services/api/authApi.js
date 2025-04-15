import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const fetchUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`, {}, {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
