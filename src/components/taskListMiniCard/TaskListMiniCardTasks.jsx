import { CheckedCheckBox, UncheckedCheckBox } from "../utils/CheckBox";

const TaskListMiniCardTasks = ({ tasks }) => {
  return (
    <div className="px-3 py-3">
      <ol>
        {tasks.sort((a, b) => a._id.localeCompare(b._id)).map((task) => {
          return (
            <li className="flex gap-1" key={task._id}>
              <div>{task.completed ? <CheckedCheckBox /> : <UncheckedCheckBox />}</div>
              <h1 className="text-gray-800 dark:text-gray-300 truncate ">{task.title}</h1>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default TaskListMiniCardTasks;