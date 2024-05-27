import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({message: "", status: false});

  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setError({message: "As senhas não coincidem", status: true});
      return;
    }

    if (credentials.password.length < 6) {
      setError({message: "A senha deve ter no mínimo 6 caracteres", status: true});
      return;
    }

    try {
      await signup(credentials);
      nav("/login");
    } catch (error) {
      console.error(error);
      setError({message: error.message, status: true});
    }
  }

  return (
    <div className="flex h-screen bg-blue-100 dark:bg-gray-900">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-blue-200 rounded-lg shadow-md dark:bg-gray-800 m-auto">
        <div className="flex justify-center"><h1 className="text-gray-700 dark:text-gray-400 mx-auto text-5xl font-semibold pt-4">ToDo List</h1></div>
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
          </div>
          <p className="mt-1 text-center text-gray-600 dark:text-gray-400">
            Crie uma conta ou entre.
          </p>
          <form>
          <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                value={credentials.email}
                onChange={(e) => {setCredentials({ ...credentials, email: e.target.value }); setError({message: "", status: false});}}
                type="email"
                placeholder="E-mail"
                aria-label="E-mail"
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                value={credentials.username}
                onChange={(e) => {setCredentials({ ...credentials, username: e.target.value }); setError({message: "", status: false});}}
                type="text"
                placeholder="Usuário"
                aria-label="Usuário"
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                value={credentials.password}
                onChange={(e) => {setCredentials({ ...credentials, password: e.target.value }); setError({message: "", status: false});}}
                type="password"
                placeholder="Senha"
                aria-label="Senha"
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                value={credentials.confirmPassword}
                onChange={(e) => {setCredentials({ ...credentials, confirmPassword: e.target.value }); setError({message: "", status: false});}}
                type="password"
                placeholder="Confirmar senha"
                aria-label="Confirmar senha"
              />
            </div>
            {error.status && <p className="text-red-500 text-sm">{error.message}</p>}
            <div className="flex items-center justify-between mt-4">
              <button 
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                onClick={handleSignup}
              >
                Criar
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-blue-300 dark:bg-gray-700">
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Tem uma conta?{" "}
          </span>
          <Link
            to="/login"
            className="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;