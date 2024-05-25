import { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskCard from "../components/TaskListCard";
import { useSessionContext } from "../auth/authProvider";

import { 
  getTaskLists, 
  createTaskList, 
  deleteTaskList, 
  updateTaskList, 
  getTaskList 
} from "../api";

import { Outlet, Link } from "react-router-dom";

const Home = () => {

  const { userId }  = useSessionContext();

  const [ taskLists, setTaskLists ] = useState([]);

  // Atualiza a lista de tarefas toda vez que o userId mudar
  useEffect(() => {
    if (userId) try {
      getTaskLists(userId).then((taskLists) => {
        setTaskLists(taskLists);
      });
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  const handleTaskListDelete = async (taskListId) => {
    try {
      await deleteTaskList(taskListId);
    } catch (error) {
      console.error(error);
      return;
    }
    setTaskLists(taskLists.filter((taskList) => taskList._id !== taskListId));
  }

  const handleTaskListCreate = async (taskListData) => {
    try {
      await createTaskList(userId, taskListData);
    } catch (error) {
      console.error(error);
      return;
    }
    const newTaskLists = await getTaskLists(userId);
    setTaskLists(newTaskLists);
  }

  const handleTaskListEdit = async (taskList) => {
    try {
      const taskListCopy = { ...taskList };
      await updateTaskList(taskList._id, taskListCopy);
      setTaskLists(taskLists.map((list) => list._id === taskList._id ? taskList : list));
    } catch (error) {
      console.error(error);
    }
  }

  const handleTaskCreate = async (taskListId, taskData) => {
    try {
      const taskList = await getTaskList(taskListId);
      taskList.tasks.push(taskData);
      await updateTaskList(taskListId, taskList);
      setTaskLists(taskLists.map((list) => list._id === taskListId ? taskList : list));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative z-0 min-h-screen dark:bg-gray-900">

      <Header />

      <ul className="flex flex-row justify-center flex-wrap p-5">
        {
          taskLists.map((taskList) => {
            return (
              <li className="m-3" key={taskList._id}>
                <Link to={`taskList/${taskList._id}`}>
                  <TaskCard taskList={taskList} />
                </Link>
              </li>
            )
          })
        }
      </ul>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <Outlet context={
          { 
            handleTaskListDelete, 
            handleTaskListCreate, 
            handleTaskListEdit
          }
        }/>
      </div>

      <div className="flex flex-row z-10 fixed bottom-4 right-4">
        <Link to="/createTaskList" >

          <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-12 h-12 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
            </svg>
          </button>

        </Link>
      </div>

    </div>
  );
}

export default Home;