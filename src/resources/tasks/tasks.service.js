const tasksRepo = require('./tasks.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = task => tasksRepo.create(task);
const update = (boardId, taskId, taskData) =>
  tasksRepo.update(boardId, taskId, taskData);
const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);
module.exports = { getAll, get, create, update, del };
