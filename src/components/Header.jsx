import { Link } from "react-router-dom";
import { useSessionContext } from "../auth/authProvider";
const Header = () => {
  const { logout } = useSessionContext();
  return (   
    <nav className="bg-white shadow dark:bg-gray-800 flex flex-row">
      <div className="flex items-center justify-between w-full p-4 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <h1
          className="text-gray-800 text-2xl transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6"
        >
          To Do
        </h1>
        <button
          href="#"
          className="border-transparent bg-gray-900 p-2 rounded-lg hover:bg-gray-950 hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;