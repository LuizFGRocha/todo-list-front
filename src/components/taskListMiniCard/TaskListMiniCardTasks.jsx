const TaskListMiniCardTasks = ({ tasks }) => {
  return (
    <div className="px-3 py-3">
      <ol>
        {tasks.sort((a, b) => a._id.localeCompare(b._id)).map((task) => {
          return (
            <li className="text-gray-800 dark:text-gray-300 truncate" key={task._id}>
              {task.completed ? "✅ " : "❌ "}
              {task.title}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default TaskListMiniCardTasks;