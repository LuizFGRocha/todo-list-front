import CreateTaskListCardHeader from "./CreateTaskListCardHeader";
import CreateTaskListCardForm from "./CreateTaskListCardForm";

const CreateTaskList = () => {
  return (
    <div className="backdrop-blur-sm w-svw h-svh flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg overflow-hidden bg-blue-200 rounded-lg shadow-lg dark:bg-gray-800 border border-gray-700">

        <CreateTaskListCardHeader />

        <CreateTaskListCardForm />
        
      </div>
    </div>
  );
}

export default CreateTaskList;