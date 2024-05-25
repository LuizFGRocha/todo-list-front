import { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { getTaskList } from "../api";
import { useSessionContext } from "../auth/authProvider";

const TaskList = () => {

  const formatDate = (date) => {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const { userId } = useSessionContext();
  const taskListId = useParams().id

  const [ taskList, setTaskList ] = useState({ name: null, description: null, date: null, tasks: [] });
  const [ editedTaskList, setEditedTaskList ] = useState({ name: null, description: null, date: null, tasks: [] });
  const [ editMode, setEditMode ] = useState(false);
  const [ addingTask, setAddingTask ] = useState(false);
  const [ newTask, setNewTask ] = useState({ title: "", completed: false });

  const handleInsert = (e) => {
    e.preventDefault();
    const newTaskList = { ...editedTaskList };
    newTaskList.tasks.push(newTask);
    setEditedTaskList(newTaskList);
    setAddingTask(false);
    setNewTask({ title: "" });
    
  };

  useEffect(() => {
    if (userId) try {
      getTaskList(taskListId).then((taskLists) => {
        setTaskList(taskLists);
        setEditedTaskList(taskLists);
      });
    } catch (error) {
      console.error(error);
    }
  // Desativa warnig. Se o taskListId entrar nas dependências,
  // acontece um loop infinito
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const { handleTaskListDelete, handleTaskListEdit } = useOutletContext();

  return (
    <div className="backdrop-blur-sm w-svw h-svh flex items-center justify-center min-h-screen">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 h-80 relative z-0 border border-gray-700" style={{width: "60svw"}}>

        <div className="flex items-center pl-6 pr-2 py-3 bg-gray-900 justify-between">

          <h1 className="text-2xl font-semibold text-gray-300" hidden={editMode}>
            {taskList.name}
          </h1>

          <input 
            className="text-2xl font-semibold text-gray-300 bg-transparent" 
            hidden={!editMode} 
            value={editedTaskList.name}
            onChange={(e) => setEditedTaskList({ ...editedTaskList, name: e.target.value })}
          />

          <h1 
            className="text-md text-gray-300 text-semibold p-1 px-2 mx-4 rounded-md w-fit" 
            style={{backgroundColor: (new Date(taskList.date) > new Date()) ? 'transparent' : '#610000'}}
            hidden={taskList.date == null}
          >
            {formatDate(taskList.date)}
          </h1>

          <div className="flex flex-row-reverse pt-1 gap-4">

            <Link to='/' aria-label="Fechar" className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="rgb(156 163 175)" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>

            <Link to="/" onClick={() => handleTaskListDelete(taskListId)} aria-label="Excluir" className="m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(156 163 175)" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg>
            </Link>

            <button onClick={() => {setEditMode(!editMode)}} aria-label="Editar" className="px-3 rounded-md" style={{backgroundColor: (editMode ? "rgb(31 41 55)" : "transparent")}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(156 163 175)" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
              </svg>
            </button>

          </div>

        </div>

        <div className="py-2">

          <h1 className="px-6 text-lg font-semibold text-gray-800 dark:text-white" hidden={editMode}>
            {taskList.description}
          </h1>

          <input 
            className=" px-6 text-lg font-semibold text-gray-800 dark:text-white bg-transparent" 
            hidden={!editMode}
            value={editedTaskList.description}
            onChange={(e) => setEditedTaskList({ ...editedTaskList, description: e.target.value })}
          />

          <ol className="px-2">
            {taskList.tasks.map((task) => {
              return (
                <li key={task._id} className="flex flex-row">
                  <button className="m-1" onClick={() => alert("Vou mudar!")}>
                    { task.completed ? "✅ " : "❌ " }
                  </button>
                  <h1 
                    className="text-gray-300 rounded-md outline-none w-full pt-1"
                    hidden={editMode}
                  >
                    {task.title}
                  </h1>
                  <input
                    hidden={!editMode}
                    value={task.title}
                    className="bg-transparent text-gray-300 rounded-md outline-none w-full"
                    onChange={(e) => {
                      const newTaskList = { ...editedTaskList };
                      newTaskList.tasks = newTaskList.tasks.map((t) => t._id === task._id ? { ...t, title: e.target.value } : t);
                      setEditedTaskList(newTaskList);
                    }}
                  />
                </li>
              );
            })}

            <form hidden={!addingTask}>
              <li className="flex flex-row justify-between">
                <input 
                  value={newTask.title}
                  className="pl-8 text-gray-300 bg-transparent pt-1 rounded-md outline-none w-full"
                  style={{paddingLeft: "30px"}}
                  placeholder="Título da tarefa"
                  onChange={(e) => {
                    setNewTask({ ...newTask, title: e.target.value });
                  }}
                />
                <button 
                  className="px-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-900"
                  onClick={(e) => handleInsert(e)}>
                    Inserir
                </button>
              </li>
            </form>
          </ol>

        </div>

        <button className="m-3 rounded-full p-2 hover:bg-gray-900 transition-colors duration-300" onClick={() => setAddingTask(!addingTask)} hidden={ addingTask }>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
          </svg>
        </button>

        <button 
          className="p-3 bg-gray-950  text-gray-200 rounded-md absolute bottom-4 right-4 z-10"
          hidden={ !editMode }
          onClick={() => alert("Salvando!")}>
            Salvar
        </button>
      </div>
    </div>

  );
}

export default TaskList;