const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/tasks.model');

const DB = [];
DB.push(new User(), new User(), new User());

const BoardDB = [];
BoardDB.push(new Board(), new Board());

let TasksDB = [];

// сделать мапу
// ------------- users ----------------
const getAllUsers = async () => DB.slice();
const getUser = async id => DB.filter(user => user.id === id)[0];
const createUser = user => {
  DB.push(user);
  return user;
};

const updateUser = async user => {
  let indexOfUser = null;
  DB.forEach((item, index) => {
    if (item.id === user.id) {
      indexOfUser = index;
    }
  });
  if (indexOfUser === null) {
    throw new Error(`user with id ${user.id} was not found`);
  }
  DB[indexOfUser] = new User(user);
  return DB[indexOfUser];
};

const deleteUser = async id => {
  const indexOfUser = DB.findIndex(user => user.id === id);
  DB.splice(indexOfUser, 1);
  TasksDB.map(task => {
    if (task.userId === id) task.userId = null;
  });
};

// ------------- boards ----------------

const getAllBoards = async () => BoardDB.slice();

const getBoard = async id => BoardDB.filter(board => board.id === id)[0];

const createBoard = board => {
  BoardDB.push(board);
  return board;
};

const updateBoard = async board => {
  let indexOfBoard = null;
  BoardDB.forEach((item, index) => {
    if (item.id === board.id) {
      indexOfBoard = index;
    }
  });
  if (indexOfBoard === null) {
    throw new Error(`board with id ${board.id} was not found`);
  }
  BoardDB[indexOfBoard] = new Board(board);
  return BoardDB[indexOfBoard];
};

const deleteBoard = async id => {
  const indexBoardForDelete = BoardDB.findIndex(board => board.id === id);
  BoardDB.splice(indexBoardForDelete, 1);
  TasksDB = TasksDB.filter(task => task.boardId !== id);
};

// ------------- tasks ----------------
const getAllTasks = async id => TasksDB.filter(task => task.boardId === id);

const getTask = async (boardId, taskId) =>
  TasksDB.slice().filter(
    task => task.id === taskId && task.boardId === boardId
  )[0];

const createTask = task => {
  TasksDB.push(task);
  return task;
};

const updateTask = async (boardId, taskId, taskData) => {
  const isBoardExist = BoardDB.some(board => board.id === boardId);
  if (!isBoardExist) {
    throw new Error(`Board with id ${boardId} was not found`);
  }
  let indexOfTask = null;
  TasksDB.forEach((item, index) => {
    if (item.id === taskId && item.boardId === boardId) {
      indexOfTask = index;
    }
  });
  if (indexOfTask === null) {
    throw new Error(`task with id ${taskId} was not found`);
  }
  TasksDB[indexOfTask] = { id: taskId, ...taskData };
  return TasksDB[indexOfTask];
};

const deleteTask = async (boardId, taskId) => {
  try {
    const isBoardExist = BoardDB.some(board => board.id === boardId);
    if (!isBoardExist) {
      return new Error(`Board with id ${boardId} was not found`);
    }
    const indexOfTasks = TasksDB.findIndex(e => e.id === taskId);
    if (indexOfTasks >= 0) {
      TasksDB.splice(indexOfTasks, 1);
      return;
    }
    return new Error(`task with id ${taskId} was not found`);
  } catch (err) {
    return new Error(`task with id ${taskId} was not found`);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
