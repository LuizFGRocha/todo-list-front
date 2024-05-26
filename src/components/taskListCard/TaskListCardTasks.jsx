const TaskListCardTasks = ({
  tasks,
  toBeRemovedTasks,
  setToBeRemovedTasks,
  editMode,
  handleCheck,
  toBeEditedTasks,
  setToBeEditedTasks,
}) => {
  const handleMarkRemove = (taskId) => {
    if (toBeRemovedTasks.includes(taskId)) {
      setToBeRemovedTasks(toBeRemovedTasks.filter((_id) => _id !== taskId));
    } else {
      setToBeRemovedTasks([...toBeRemovedTasks, taskId]);
    }
  };

  return (
    <ol className="px-2 m-2 mt-3">
      {tasks.map((task) => {
        return (
          <li key={task._id} className="flex flex-row justify-start w-full">
            <button className="m-1" onClick={() => handleCheck(task._id)}>
              {task.completed ? "✅ " : "❌ "}
            </button>
            <h1
              className="text-gray-300 rounded-md outline-none pt-1 pr-2"
              hidden={editMode}
            >
              {task.title}
            </h1>

            <button
              hidden={!editMode}
              onClick={() => handleMarkRemove(task._id)}
              className="pt-1 pr-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="rgb(156 163 175)"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>

            <input 
              hidden={!editMode}
              className="text-gray-300 rounded-md outline-none pt-1 pr-2 bg-transparent w-full"
              value={toBeEditedTasks[task._id] || task.title}
              onChange={(e) => setToBeEditedTasks({ ...toBeEditedTasks, [task._id]: e.target.value })}
              style={{
                textDecoration: toBeRemovedTasks.includes(task._id)
                  ? "line-through"
                  : "none",
              }}
            />
          </li>
        );
      })}
    </ol>
  );
};

export default TaskListCardTasks;
