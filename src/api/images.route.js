import fs from "fs";
import path from "path";
const Sequelize = require("sequelize");

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

export default (app, db) => {
  app.get("/download", (req, res) => {
    var img = fs.readFileSync("public/favicon.ico");
    res.writeHead(200, { "Content-Type": "image/gif" });
    res.end(img, "binary");
  });

  app.get("/test", (req, res) => {
    console.log(111);
    var img = fs.readFileSync(path.resolve(__dirname, "../../public/test.js"));
    res.writeHead(200, { "Content-Type": "application/x-javascript" });
    res.end(img, "binary");
  });

  app.get("/db", (req, res) => {

      // pool
      // .query("SELECT * FROM game_usr_prfl WHERE NT_LOGIN = :NT_LOGIN", {
      //   replacements: { NT_LOGIN: "kanchen" }
      // })
      // .then(projects => {
      //   // console.log(projects)
      //   res.send(projects);
      // });

      pool.query("SELECT * FROM game_usr_prfl WHERE NT_LOGIN = ?", {NT_LOGIN: 'kanchen'}, function (error, results, fields) {
          if (error) throw error;
          console.log(results.insertId);
      });
  });

  app.get("/insert", (req, res) => {
    // db
    //   .query("UPDATE game_usr_prfl SET SCR = 101 WHERE NT_LOGIN = :NT_LOGIN", {
    //     replacements: { NT_LOGIN: "kanchen" }
    //   })
    //   .then(projects => {
    //     // console.log(projects)
    //     res.send(projects);
    //   });

    var SocialUrl = db.define(
      "SocialUrl",
      {
        videoURL: Sequelize.STRING,
        // artistId: Sequelize.STRING,
        // type: Sequelize.STRING
      },
      {
        tableName: "social_urls",
        timestamps: false
      }
    );

    SocialUrl.sync()
      .then(() => {
        // // Table created
        // return SocialUrl.create({
        //   videoURL: "abc",
        //   artistId: "123",
        //   type: "bbb"
        // });
      })
      .then(() => {
        SocialUrl.findAll().then(users => {
          // console.log(users);

          res.send(users)
        });
      });

    // SocialUrl.create({
    //   videoURL: "abc",
    //   artistId: "123",
    //   type: "bbb"
    // }).complete(function(err, socialUrl) {
    //   if (err) {
    //     // log error;
    //   } else {
    //     console.log(socialUrl);
    //   }
    // });
  });
};
