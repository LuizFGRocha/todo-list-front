import { useSessionContext } from "../../auth/authProvider";

const Header = () => {
  const { logout, username } = useSessionContext();
  return (   
    <nav className="bg-blue-300 shadow dark:bg-gray-800 flex flex-row">
      <div className="flex items-center justify-between w-full p-4 mx-auto text-gray-600 dark:text-gray-300">
        <div className="flex items-center  mx-1.5 sm:mx-6 gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" className="bi bi-check2-square fill-gray-800 dark:fill-gray-200" viewBox="0 0 16 16" style={{paddingTop: "2px"}}>
            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
          </svg>
          <h1
            className="text-gray-800 text-2xl text-bold transition-colors duration-300 transform dark:text-gray-200"
          >
            ToDo List
          </h1>
        </div>
        <div>
          <span className="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 text-lg">
            {username}
          </span>
          <button
            href="#"
            className="dark:text-gray-300 text-gray-950 border-transparent bg-blue-500 dark:bg-gray-900 p-2 rounded-lg dark:hover:bg-gray-950 hover:bg-blue-600 hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
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