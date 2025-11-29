require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false }
});

module.exports = { pool };

// to check 
/*pool.query("SELECT NOW()", (err, res) => {
    if (err) console.error(err);
    else console.log("DB connected:", res.rows);
});
*/
// should show : DB connected: [ { now: 2025-11-22T19:04:15.183Z } ] when db.js is run
