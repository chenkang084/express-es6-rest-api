const Sequelize = require("sequelize");
const mongoose = require("mongoose");

export default callback => {
  // connect to a database if needed, then pass it to `callback`:
  var mysql = require("mysql");
  var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "game",
    connectionLimit: 10
  });

  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("db connected!");
  });

  mongoose.createConnection(
    'mongodb://127.0.0.1/node_club_dev',
    {
      server: { poolSize: 20 }
    },
    function(err) {
      if (err) {
        logger.error("connect to %s error: ", config.db, err.message);
        process.exit(1);
      }

      console.log('mongooDB connected!')
    }
  );

  callback(pool);
};
