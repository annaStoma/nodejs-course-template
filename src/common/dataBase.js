const User = require('../resources/users/user.model');

const DB = [];
DB.push(new User(), new User(), new User());

// сделать мапу
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
  let indexOfUser = null;
  DB.forEach((item, index) => {
    if (item.id === id) {
      indexOfUser = index;
    }
  });
  if (indexOfUser === null) {
    throw new Error(`user with id ${id} was not found`);
  }
  DB.splice(indexOfUser, 1);
  console.log(DB);
  return DB[indexOfUser];
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
