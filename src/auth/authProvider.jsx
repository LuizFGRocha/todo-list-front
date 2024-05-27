import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { checkToken, login as apiLogin } from "../api";

const AuthContext = createContext();

export const useSessionContext = () => useContext(AuthContext);

export const AuthProvider = () => {
  const [ userId, setUserId ] = useState(null);
  const [ username, setUsername ] = useState(null);

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
      setUsername(username);
      localStorage.setItem('userId', res.data.uid);
      nav('/');
    } else {
      throw new Error("Erro ao obter ID do usuário");
    }
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    nav('/login');
  };

  useEffect(() => {
    const localUserId = localStorage.getItem('userId');
    if (localUserId === null) {
      nav('/login');
    } else {
      checkToken(localUserId).then( (res) => {
      if (res.status === 200) {
        setUserId(localUserId);
        nav('/');
      }}).catch( (error) => {
        nav('/login');
        setUserId(null);
        localStorage.removeItem('userId');
      });
    }
  }, [nav, userId]);

  return (
    <AuthContext.Provider value={{ userId, login, logout, username }}>
      <ErrorBoundary logout={logout} nav={nav}>
        <Outlet />
      </ErrorBoundary>
    </AuthContext.Provider>
  );
}