import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useSessionContext = () => useContext(AuthContext);

export const AuthProvider = () => {
  const [ userId, setUserId ] = useState(null);

  const login = async (username, password) => {
    console.log("Logando");
    let res;
    try {
      res = await axios.post('http://localhost:3001/login', { username, password }, { withCredentials: true });
    } catch (error) {
      if (error.response) {
        res = error.response;
      } else {
        throw error;
      }
    }

    if (res.status === 200) {
      console.log("UID setado");
      setUserId(res.data.uid);
    }
  };

  const logout = () => {
    setUserId(null);
  };

  const nav = useNavigate();
  useEffect(() => {
    if (userId === null) {
      nav('/login');
    } else {
      nav('/');
    }
  }, [userId]);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      <Outlet />
    </AuthContext.Provider>
  );
}