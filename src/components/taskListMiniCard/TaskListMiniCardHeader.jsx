const TaskListMiniCardHeader = ({ name, date, description }) => {
  
  const formatDate = (date) => {
    date = new Date(date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className="flex pr-7 py-3 bg-gray-800 flex-col">
        <h1 className="text-2xl pl-6 font-semibold text-gray-300 truncate">{name}</h1>
        <h1 className="text-md text-gray-800 dark:text-gray-200 px-6 truncate">
          {description}
        </h1>
        <h1 
          className="text-md text-gray-300 text-semibold p-1 px-2 mx-4 rounded-md w-fit" 
          style={
            {
              backgroundColor: (new Date(date) > new Date()) ? 'transparent' : '#610000',
              padding: (new Date(date) > new Date()) ? '0rem 0rem 0.5rem 0.5rem' : '0.25rem 0.5rem',
            }
          }
          hidden={date == null}
        >
            {formatDate(date)}
        </h1>
      </div>
    </div>
  );
}

export default TaskListMiniCardHeader;