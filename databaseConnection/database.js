// database.js

const mysql = require('mysql2');
const db = require('./dbinfo'); // Adjust path as needed

const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.name,
  port: db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testing the connection
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) {
    connection.release();
    console.log('Database connected!');
  }
  return;
});

module.exports = pool;