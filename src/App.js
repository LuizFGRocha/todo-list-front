import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/authProvider";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateTaskList from "./components/CreateTaskList";
import TaskCard from "./components/TaskListCard";
import TaskList from "./pages/tasklist";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/createTaskList",
            element: <CreateTaskList />,
          },
          {
            path: "/taskList/:id",
            element: <TaskList />,
          }
        ]
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      }
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;