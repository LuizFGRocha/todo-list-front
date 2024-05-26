import TaskListMiniCardHeader from "./TaskListMiniCardHeader";
import TaskListMiniCardTasks from "./TaskListMiniCardTasks";

const TaskCard = ({ taskList }) => {

  return (
    <div className="w-72 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-700 h-80 border border-gray-700">

      <TaskListMiniCardHeader 
        name={taskList.name}
        date={taskList.date}
        description={taskList.description}
      />

      <TaskListMiniCardTasks 
        tasks={taskList.tasks}      
      />

    </div>
  );
}

export default TaskCard;