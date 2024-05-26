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

export const signup = async (userData) => {
  try {
    const res = await api.post("/signup", userData);
    if (res.status === 400) {
      return res.body;
    }
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getTaskLists = async (userId) => {
  try {
    const res = await api.get(`/taskLists/${userId}`);
    return res.data.taskLists;
  } catch (error) {
    throw error;
  }
};

export const createTaskList = async (userId, taskListData) => {
  try {
    taskListData = cleanNullProperties(taskListData);
    const res = await api.post(`/taskList/${userId}`, taskListData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTaskList = async (taskListId) => {
  try {
    const res = await api.get(`/taskList/${taskListId}`);
    return res.data.taskList;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskList = async (taskListId) => {
  try {
    const res = await api.delete(`/taskList/${taskListId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskList = async (taskListId, taskListData) => {
  try {
    taskListData = cleanNullProperties(taskListData);
    const res = await api.put(`/taskList/${taskListId}`, taskListData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskListId, taskData) => {
  try {
    taskData = cleanNullProperties(taskData);
    const res = await api.post(`/task/${taskListId}`, taskData);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const updateTask = async (taskId, taskData) => {
  try {
    taskData = cleanNullProperties(taskData);
    const res = await api.put(`/task/${taskId}`, taskData);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteTask = async (taskId) => {
  try {
    const res = await api.delete(`/task/${taskId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const checkToken = async (localUserId) => {
  try {
    const res = await api.get(`/checkToken/${localUserId}`);
    return res;
  } catch (error) {
    throw error;
  }
}
