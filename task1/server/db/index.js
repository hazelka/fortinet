const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.log(err.message);
  } 

  console.log('Connected to database');
});

module.exports = db;

