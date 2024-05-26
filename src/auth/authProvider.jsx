import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { checkToken, login as apiLogin } from "../api";

const AuthContext = createContext();

export const useSessionContext = () => useContext(AuthContext);

export const AuthProvider = () => {
  const [ userId, setUserId ] = useState(null);

  const nav = useNavigate();

  const login = async (username, password) => {

    let res;
    try {
      res = await apiLogin({ username, password });
    } catch (error) {
      throw error;
    }

    if (res.status === 200 && res.data.uid) {
      setUserId(res.data.uid);
      localStorage.setItem('userId', res.data.uid);
      nav('/');
    } else {
      throw new Error("Erro ao obter ID do usuário");
    }
  };

  const logout = () => {
    setUserId(null);
    nav('/login');
  };

  useEffect(() => async () => {
    const localUserId = localStorage.getItem('userId');
    if (localUserId === null) {
      nav('/login');
    } else {
      try {
        const res = await checkToken(localUserId);
        if (res.status === 200) {
          setUserId(localUserId);
          nav('/');
        }
      } catch (error) {
        nav('/login');
        setUserId(null);
        localStorage.removeItem('userId');
      }
    }
  }, [nav]);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      <ErrorBoundary logout={logout} nav={nav}>
        <Outlet />
      </ErrorBoundary>
    </AuthContext.Provider>
  );
}