const connection = require('../helpers/connection');

const serialize = (user) => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  }
};

const createUser = async (firstName, lastName, email, password) => {
 query = `INSERT INTO users.user (first_name, last_name, email, password) 
  VALUES (?,?,?,?)
 `
  const data = await connection.execute(query, [firstName, lastName, email, password])

  return data;
};

const getAllUsers = async () => {
  query = `SELECT * FROM users.user`
  const [users] = await connection.execute(query)


  return users.map(user => serialize(user));
};

const getUserById = async (id) => {
  query = 'SELECT * FROM users.user WHERE id = ?'

  const [user] = await connection.execute(query, [id]);

  return user?.map(item => serialize(item));
};

const updateUser = async (id, firstName, lastName, email, password) => {
  query = `UPDATE users.user 
    SET first_name=?, last_name=?, email=?, password=?
    WHERE id=?`

  await connection.execute(query, [firstName, lastName, email, password, id])
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};