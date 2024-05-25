import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

const cleanNullProperties = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

export const getTaskLists = async (userId) => {
  const res = await api.get(`/taskLists/${userId}`);
  return res.data.taskLists;
};

export const createTaskList = async (userId, taskListData) => {
  taskListData = cleanNullProperties(taskListData);
  console.log(taskListData);
  const res = await api.post(`/taskList/${userId}`, taskListData);
  return res.data;
};

export const getTaskList = async (taskListId) => {
  const res = await api.get(`/taskList/${taskListId}`);
  return res.data.taskList;
};

export const deleteTaskList = async (taskListId) => {
  const res = await api.delete(`/taskList/${taskListId}`);
  return res.data;
};

export const updateTaskList = async (taskListId, taskListData) => {
  taskListData = cleanNullProperties(taskListData);
  const res = await api.put(`/taskList/${taskListId}`, taskListData);
  return res.data;
};

export const createTask = async (taskListId, taskData) => {
  taskData = cleanNullProperties(taskData);
  const res = await api.post(`/task/${taskListId}`, taskData);
  return res.data;
}

