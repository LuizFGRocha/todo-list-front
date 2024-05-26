import { Link } from 'react-router-dom';
import TaskListMiniCard from '../taskListMiniCard/TaskListMiniCard';

const CardList = ({ taskLists }) => {
  return (
    <ul className="flex flex-row justify-center flex-wrap p-5"> {
      taskLists.map((taskList) => {
        return (
          <li className="m-3" key={taskList._id}>
            <Link to={`taskList/${taskList._id}`}>
              <TaskListMiniCard taskList={taskList} />
            </Link>
          </li>
        )
      })
    }</ul>
  );
}

export default CardList;