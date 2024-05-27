import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { createTaskList } from "../../api";
import { useSessionContext } from "../../auth/authProvider";

// todo: pensar direito nesse onSubmit e na forma de voltar para a página inicial
// talvez useNavigate se a criação der certo?

const CreateTaskListCardForm = ({ onSubmit }) => {
  const [ usingDate, setUsingDate ] = useState(false);
  const [ taskListData, setTaskListData ] = useState({ name: "", description: "", date: new Date() });

  const { refreshHome } = useOutletContext();

  const nav = useNavigate();

  const userId = useSessionContext().userId;

  const handleTaskListCreate = async (taskListData, e) => {
    e.preventDefault();
    try {
      await createTaskList(userId, taskListData);
      await refreshHome();
      nav("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="p-5 text-gray-800 dark:text-gray-300">

      <div className="flex flex-col gap-3">

        <textarea
          value={taskListData.name} 
          placeholder="Nome da lista" 
          aria-label="Nome da lista"
          onChange={(e) => setTaskListData({ ...taskListData, name: e.target.value })}
          className="bg-transparent text-clip text-2xl placeholder-gray-800 dark:placeholder-gray-300"
        />

        <textarea
          value={taskListData.description} 
          placeholder="Descrição da lista" 
          aria-label="Descrição da lista"
          onChange={(e) => setTaskListData({ ...taskListData, description: e.target.value })}
          className="bg-transparent text-clip text-lg placeholder-gray-800 dark:placeholder-gray-300"
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
          className="bg-transparent placeholder-gray-800 dark:placeholder-gray-300"
          hidden={!usingDate}
        />

        <button 
          onClick={(e) => handleTaskListCreate({ ...taskListData, date: (usingDate ? taskListData.date : null) }, e)} 
          className="dark:bg-gray-900 bg-blue-400 p-2 rounded-md dark:hover:bg-gray-950">
            Criar
        </button>

      </div>

    </form>
  );
}

export default CreateTaskListCardForm;