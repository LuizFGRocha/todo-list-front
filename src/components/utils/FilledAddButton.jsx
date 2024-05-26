const FilledAddButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-12 h-12 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
      </svg>
    </button>
  );
}

export default FilledAddButton;