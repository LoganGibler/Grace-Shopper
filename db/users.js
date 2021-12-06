const { Client } = require("pg");
const DB_NAME = "grace_shopper";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
// database methods

async function createUser({username, password}) {
  // Get all of the fields from the passed in object
  
  try {
    // insert the correct fields into the reports table
    // remember to return the new row from the query
    const {
      rows: [users],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING *;
    `,
      [username, password]
    );
    // return the new report
    console.log(users)
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM users 
      WHERE username=$1
    `,
      [username]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM users 
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT * FROM users
      WHERE id=$1
    `,[userId]);
    return user;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createUser,
  getUserByUsername,
  getAllUsers,
  getUserById
};
