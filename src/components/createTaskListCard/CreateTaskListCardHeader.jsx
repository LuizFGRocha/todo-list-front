import { Link } from 'react-router-dom';

const CreateTaskListCardHeader = () => {
  return (
    <div className="bg-blue-300 dark:bg-gray-900 px-2 py-2 pb-0 text-gray-800 dark:text-gray-300 flex justify-between">
      <h1 className="text-gray-800 dark:text-gray-400 text-xl pl-3 pt-1 text-bold">
        Criar nova lista
      </h1>
      <Link to='/'>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="gray" viewBox="0 0 16 16" className='fill-gray-800 dark:fill-gray-300'>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default CreateTaskListCardHeader;