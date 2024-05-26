import { useEffect, useState } from "react";
import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { getTaskList, updateTaskList, deleteTask, createTask, deleteTaskList, updateTask } from "../../api";
import { useSessionContext } from "../../auth/authProvider";

import TaskListCardHeader from "./TaskListCardHeader";
import TaskListCardTasks from "./TaskListCardTasks";
import AddButton from "../utils/AddButton";
import AddTaskForm from "./AddTaskForm";

const TaskList = () => {

  const { userId } = useSessionContext();
  const { refreshHome } = useOutletContext();
  const taskListId = useParams().id

  const [ taskList, setTaskList ] = useState({ name: "", description: "", date: new Date(), tasks: [] });
  const [ editedTaskList, setEditedTaskList ] = useState({ name: "", description: "", date: new Date(), tasks: [] });
  const [ editMode, setEditMode ] = useState(false);
  const [ addingTask, setAddingTask ] = useState(false);
  const [ newTask, setNewTask ] = useState({ title: "", completed: false });
  const [ toBeRemovedTasks, setToBeRemovedTasks ] = useState([]);

  const nav = useNavigate();

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

  useEffect(() => setToBeRemovedTasks([]), [editMode]);

  const handleInsert = (e) => {
    createTask(taskListId, newTask).then(() => {
      setNewTask({ title: "", completed: false });
      refreshHome();
      setAddingTask(false);
      getTaskList(taskListId).then((taskLists) => {
        setTaskList(taskLists);
        setEditedTaskList(taskLists);
      });
    });
  };

  const handleEdit = async (e) => {
    try {
      for (const taskId of toBeRemovedTasks) {
        await deleteTask(taskId);
      }
      await updateTaskList(taskListId, editedTaskList)
      await refreshHome();

      const newTaskList = await getTaskList(taskListId);

      setTaskList(newTaskList);
      setEditedTaskList(newTaskList);
      setEditMode(!editMode);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskListDelete = async (e) => {
    try {
      await deleteTaskList(taskListId);
      refreshHome();
      nav('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = async (taskId) => {
    try {
      const task = taskList.tasks.find((task) => task._id === taskId);
      await updateTask(taskId, { completed: !task.completed });
      const updatedTaskList = await getTaskList(taskListId);
      setTaskList(updatedTaskList);
      await refreshHome();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="backdrop-blur-sm w-svw h-svh flex items-center justify-center min-h-screen">
      <div className="w-svw md:w-6/12 overflow-scroll bg-white rounded-lg shadow-lg dark:bg-gray-800 min-h-80 relative z-0 border border-gray-700" style={{maxHeight: "80svh"}}>

        <TaskListCardHeader 
          editMode={editMode}
          setEditMode={setEditMode}
          taskList={taskList}
          editedTaskList={editedTaskList}
          setEditedTaskList={setEditedTaskList}
          handleTaskListDelete={handleTaskListDelete}
          taskListId={taskListId}
        />

        <TaskListCardTasks 
          className="py-2"
          tasks={taskList.tasks}
          editMode={editMode}
          setEditedTaskList={setEditedTaskList}
          editedTaskList={editedTaskList}
          handleCheck={handleCheck}
          toBeRemovedTasks={toBeRemovedTasks}
          setToBeRemovedTasks={setToBeRemovedTasks}
        />

        <AddTaskForm 
          addingTask={addingTask}
          newTask={newTask}
          setNewTask={setNewTask}
          handleInsert={handleInsert}
          setAddingTask={setAddingTask}
        />

        <div hidden={addingTask}>
          <AddButton 
            onClick={() => setAddingTask(!addingTask)} 
          />
        </div>

        <button 
          className="p-3 bg-gray-950  text-gray-200 rounded-md absolute bottom-4 right-4 z-10"
          hidden={ !editMode }
          onClick={(e) => handleEdit(e)}>
            Salvar
        </button>
      </div>
    </div>

  );
}

export default TaskList;