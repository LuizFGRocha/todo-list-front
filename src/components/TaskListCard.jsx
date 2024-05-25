const TaskCard = ({ taskList }) => {
  const formatDate = (date) => {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-72 max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-700 h-80 border border-gray-700">
      <div>
        <div className="flex pr-7 py-3 bg-gray-800 flex-col">
          <h1 className="text-2xl pl-6 font-semibold text-gray-300 truncate">{taskList.name}</h1>
          <h1 
            className="text-md text-gray-300 text-semibold p-1 px-2 mx-4 rounded-md w-fit" 
            style={{backgroundColor: (new Date(taskList.date) > new Date()) ? 'transparent' : '#610000'}}
            hidden={taskList.date == null}
          >
              {formatDate(taskList.date)}
          </h1>
        </div>
        <h1 className="text-md text-gray-800 dark:text-gray-200 px-6 py-1 bg-gray-700 truncate">
          {taskList.description}
        </h1>
      </div>
      <div className="px-6 pb-2">
        <ol>
          {taskList.tasks.map((task) => {
            return (
              <li className="text-gray-300 truncate" key={task._id}>
                <button className="m-1" onClick={(e) => console.log(e.target.parentNode.parentNode.id)}>
                  {task.completed ? "✅ " : "❌ "}
                </button>
                {task.title}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default TaskCard;