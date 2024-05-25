import { useState } from "react";
import { useSessionContext } from "../auth/authProvider";
import { createTaskList } from "../api";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const CreateTaskList = () => {
  const [ taskListData, setTaskListData ] = useState({ name: "", description: "", date: new Date() });

  const [ usingDate, setUsingDate ] = useState(false);

  const { handleTaskListCreate } = useOutletContext();

  return (
    <div className="backdrop-blur-sm w-svw h-svh flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border border-gray-700">
        <div className="bg-gray-900 px-2 py-2 pb-0 text-gray-300 flex justify-between">
          <h1 className="text-gray-400 text-xl pl-3 pt-1 text-bold">
            Criar nova lista
          </h1>
          <Link to='/'>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="gray" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
          </Link>
        </div>
        <form className="p-5 text-gray-300">

          <div className="flex flex-col gap-3">

            <textarea
              value={taskListData.name} 
              placeholder="Nome da lista" 
              aria-label="Nome da lista"
              onChange={(e) => setTaskListData({ ...taskListData, name: e.target.value })}
              className="bg-transparent text-clip text-2xl"
            />

            <textarea
              value={taskListData.description} 
              placeholder="Descrição da lista" 
              aria-label="Descrição da lista"
              onChange={(e) => setTaskListData({ ...taskListData, description: e.target.value })}
              className="bg-transparent text-clip text-lg"
            />

            <div className="flex flex-row gap-2">
              <input type="checkbox" value={usingDate} onChange={() => setUsingDate(!usingDate)}/>
              <label htmlFor="usingDate">Definir data limite</label>
            </div>

            <input
              type="date"
              value={taskListData.date} 
              placeholder="Data da lista" 
              aria-label="Data da lista"
              onChange={(e) => setTaskListData({ ...taskListData, date: e.target.value })}
              className="bg-transparent"
              hidden={!usingDate}
            />

            <Link to='/'>
              <button 
                onClick={() => handleTaskListCreate({ ...taskListData, date: (usingDate ? taskListData.date : null) })} 
                className="bg-gray-900 p-2 rounded-md hover:bg-gray-950">
                  Criar
              </button>
            </Link>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateTaskList;