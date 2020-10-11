const DB = require('../../common/dataBase');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);
  if (!board) {
    throw new Error(`board with id ${id} was not found`);
  }
  return board;
};

const create = async board => DB.createBoard(board);

const update = async board => DB.updateBoard(board);
const del = async id => DB.deleteBoard(id);

module.exports = { getAll, get, create, update, del };
