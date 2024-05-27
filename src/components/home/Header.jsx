import { useSessionContext } from "../../auth/authProvider";

const Header = () => {
  const { logout, username } = useSessionContext();
  return (   
    <nav className="bg-blue-300 shadow dark:bg-gray-800 flex flex-row">
      <div className="flex items-center justify-between w-full p-4 mx-auto text-gray-600 dark:text-gray-300">
        <h1
          className="text-gray-800 text-2xl text-bold transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6"
        >
          ToDo List
        </h1>
        <div>
          <span className="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 text-lg">
            {username}
          </span>
          <button
            href="#"
            className="text-gray-950 border-transparent bg-blue-500 dark:bg-gray-900 p-2 rounded-lg dark:hover:bg-gray-950 hover:bg-blue-600 hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;