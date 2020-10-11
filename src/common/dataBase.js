const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = [];
DB.push(new User(), new User(), new User());

const BoardDB = [];
BoardDB.push(new Board(), new Board());

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
  try {
    const indexOfUser = DB.findIndex(e => e.id === id);
    if (indexOfUser >= 0) {
      DB.splice(indexOfUser, 1);
      return { error: 0 };
    }
    return { error: 1 };
  } catch (err) {
    return { error: 255 };
  }
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
  try {
    const indexOfBoard = BoardDB.findIndex(e => e.id === id);
    if (indexOfBoard >= 0) {
      BoardDB.splice(indexOfBoard, 1);
      return { error: 0 };
    }
    return { error: 1 };
  } catch (err) {
    return { error: 255 };
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
  deleteBoard
};
