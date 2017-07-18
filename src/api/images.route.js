import fs from "fs";
import path from "path";

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
      db.query("SELECT * FROM game_usr_prfl WHERE NT_LOGIN = ?", ['kanchen'], function (error, results, fields) {
          if (error) throw error;
          console.log('query ok');
          // console.log(results);
          res.send(results)
      });
  });
};
