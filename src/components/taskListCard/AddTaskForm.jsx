const AddTaskForm = ({ setAddingTask, addingTask, newTask, setNewTask, handleInsert }) => {
  return (
    <div className="px-4 pb-5" hidden={!addingTask}>
      <li className="flex flex-row justify-between gap-2">
        <input 
          value={newTask.title}
          className="pl-8 text-gray-800 dark:text-gray-300 bg-transparent pt-1 rounded-md outline-none w-full placeholder-gray-800 dark:placeholder-gray-300"
          style={{paddingLeft: "30px"}}
          placeholder="Título da tarefa"
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
          }}
        />
        <button 
          className="px-2 text-gray-800 dark:text-gray-300 bg-blue-300 dark:bg-gray-900 rounded-md hover:dark:bg-gray-900"
          onClick={(e) => setAddingTask(false)}>
            Cancelar
        </button>
        <button 
          className="px-2 text-gray-800 dark:text-gray-300 bg-blue-300 dark:bg-gray-900 rounded-md hover:dark:bg-gray-900"
          onClick={(e) => handleInsert(e)}>
            Inserir
        </button>
      </li>
    </div>
  );
}

export default AddTaskForm;