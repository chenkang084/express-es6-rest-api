import fs from "fs";
import path from "path";
const user = require("../models/user").user;
var multer = require("multer");
var upload = multer();

export default (app, db) => {
  app.get("/json", (req, res) => {
    res.send({ name: "test" });
  });

  app.post(
    "/form",
    upload.fields([
      { name: "configuration", maxCount: 1 },
      { name: "keyring", maxCount: 1 }
    ]),
    (req, res) => {
      // app.post("/form", upload.array("configuration", 1), (req, res) => {
      console.log("..........");
      fs.writeFileSync(
        `./public/imgs/${req.files[0].originalname}`,
        req.files[0].buffer,
        {
          flag: "w"
        }
      );
      // fs.writeFileSync(`./public/imgs/${req.files[1].originalname}`, req.files[1].buffer, {
      //   flag: "w"
      // });
      res.send("save ok");
    }
  );

  app.get("/image", (req, res) => {
    var img = fs.readFileSync("public/favicon.ico");
    res.writeHead(200, { "Content-Type": "image/gif" });
    res.end(img, "binary");
  });

  app.get("/showFile", (req, res) => {
    var img = fs.readFileSync(path.resolve(__dirname, "../../public/test.js"));
    res.writeHead(200, { "Content-Type": "application/x-javascript" });
    res.end(img, "binary");
  });

  app.get("/db", (req, res) => {
    db.mysql.query(
      "SELECT * FROM game_usr_prfl WHERE NT_LOGIN = ?",
      ["kanchen"],
      function(error, results, fields) {
        if (error) throw error;
        console.log("query ok");
        res.send(results);
      }
    );
  });

  app.get("/db2", (req, res) => {
    user.find(function(err, result) {
      if (err) return console.error(err);
      // console.log(result);
      res.send(result);
    });
  });
};
