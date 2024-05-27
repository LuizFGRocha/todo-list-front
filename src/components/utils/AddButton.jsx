const AddButton = ({ onClick }) => {
  return (
    <button className="m-1 mx-2 rounded-full p-2 bg-blue-400 dark:bg-transparent hover:bg-gray-900 transition-colors duration-300" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
      </svg>
    </button>
  );
};

export default AddButton;