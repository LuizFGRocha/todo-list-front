import { useState, useEffect } from "react";
import Header from "../components/home/Header";
import { useSessionContext } from "../auth/authProvider";
import FilledAddButton from "../components/utils/FilledAddButton";
import CardList from "../components/home/CardList";

import { getTaskLists } from "../api";

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

  const refreshHome = async () => {
    try {
      const newTaskLists = await getTaskLists(userId);
      setTaskLists(newTaskLists);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative z-0 min-h-screen dark:bg-gray-900">

      {/* Header */}
      <Header />

      {/* Cartões de listas de tarefas */}
      <CardList taskLists={taskLists}/>

      {/* Outlet flutuante sobre a home */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <Outlet context={{ refreshHome }}/>
      </div>

      {/* Botão flutuante para criar nova lista de tarefas */}
      <Link to="/createTaskList" className="flex flex-row z-10 fixed bottom-4 right-4">
        <FilledAddButton />
      </Link>

    </div>
  );
}

export default Home;