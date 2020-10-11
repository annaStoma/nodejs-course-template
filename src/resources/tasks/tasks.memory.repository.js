const DB = require('../../common/dataBase');

const getAll = async id => DB.getAllTasks(id);

const get = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`task with id ${boardId} and ${taskId} was not found`);
  }
  return task;
};

const create = async task => DB.createTask(task);

const update = async (boardId, taskId, taskData) =>
  DB.updateTask(boardId, taskId, taskData);
const del = async (boardId, taskId) => DB.deleteTask(boardId, taskId);

module.exports = { getAll, get, create, update, del };
