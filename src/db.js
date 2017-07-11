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

  callback(pool);
};
