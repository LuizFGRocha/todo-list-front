import { Link } from "react-router-dom";

const TaskListCardHeader = ({
  editMode,
  setEditMode,
  taskList,
  editedTaskList,
  setEditedTaskList,
  handleTaskListDelete,
  loadedData
}) => {
  const formatDate = (date) => {
    date = new Date(date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-24 flex items-center pl-6 pr-2 py-3 bg-blue-300 dark:bg-gray-900 justify-between">
      <div className="flex flex-col w-full">
        <div className="">
          {" "}
          <h1
            className="text-2xl font-semibold text-gray-900 dark:text-gray-300 w-full"
            hidden={editMode}
          >
            {taskList.name}
          </h1>
          <input
            className="text-2xl font-semibold text-gray-900 dark:text-gray-300 bg-transparent w-full outline-none"
            hidden={!editMode}
            value={editedTaskList.name}
            onChange={(e) =>
              setEditedTaskList({ ...editedTaskList, name: e.target.value })
            }
          />
        </div>

        <h1
          className="text-lg text-gray-800 dark:text-gray-400"
          hidden={editMode}
        >
          {taskList.description}
        </h1>

        <input
          className="text-lg text-gray-800 dark:text-gray-400 bg-transparent w-full outline-none pr-4"
          hidden={!editMode}
          value={editedTaskList.description}
          onChange={(e) =>
            setEditedTaskList({
              ...editedTaskList,
              description: e.target.value,
            })
          }
        />

        <div className="flex flex-row gap-2">
          <h1
            className={`text-md text-semibold rounded-md w-fit ${new Date(taskList.date) > new Date() ? 'text-gray-800 dark:text-gray-300' : 'text-gray-300'}`}
            style={{
              backgroundColor:
                new Date(taskList.date) > new Date() ? "transparent" : "#610000",
              padding: new Date(taskList.date) > new Date() ? "0rem" : "0.25rem",
            }}
            hidden={taskList.date == null || editMode || !loadedData}
          >
            {formatDate(taskList.date)}
          </h1>

          <button
            className="text-md text-gray-800 dark:text-gray-400 text-semibold rounded-md w-fit bg-transparent"
            hidden={!editMode}
            onClick={() => setEditedTaskList({ ...editedTaskList, removeDate: !editedTaskList.removeDate })}
          >
            {!editedTaskList.removeDate ? "Remover data" : "Adicionar data"}
          </button>
        </div>

        <input 
          className="text-md text-gray-800 dark:text-gray-400 text-semibold rounded-md w-fit bg-transparent"
          type="date" 
          hidden={!editMode || editedTaskList.removeDate} 
          value={editedTaskList.date || new Date()} 
          onChange={(e) => setEditedTaskList({ ...editedTaskList, date: e.target.value })} 
        />

      </div>

      <div className="flex flex-row-reverse gap-4">
        <Link to="/" aria-label="Fechar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="rgb(156 163 175)"
            viewBox="0 0 16 16"
            className="fill-gray-700 dark:fill-gray-300"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </Link>

        <button
          to="/"
          onClick={(e) => handleTaskListDelete(e)}
          aria-label="Excluir"
          className="m-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="rgb(156 163 175)"
            viewBox="0 0 16 16"
            className="fill-gray-700 dark:fill-gray-300"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
          </svg>
        </button>

        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
          aria-label="Editar"
          className="px-3 rounded-md"
          style={{
            backgroundColor: editMode ? "rgb(31 41 55)" : "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="rgb(156 163 175)"
            viewBox="0 0 16 16"
            className="fill-gray-700 dark:fill-gray-300"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskListCardHeader;
