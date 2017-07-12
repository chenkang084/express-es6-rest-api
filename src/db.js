const Sequelize = require('sequelize');


export default callback => {
  // connect to a database if needed, then pass it to `callback`:
  //   var mysql = require("mysql");
  //   var pool = mysql.createPool({
  //     host: "localhost",
  //     user: "root",
  //     password: "root",
  //     database: "game",
  //     connectionLimit: 10
  //   });

  //   pool.getConnection(function(err, connection) {
  //     if (err) throw err;
  //     console.log("db connected!");
  //   });

  const sequelize = new Sequelize("game", "root", "root", {
    host: "localhost",
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  callback(sequelize);
};
