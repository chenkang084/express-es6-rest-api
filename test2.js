const path = require("path");
const fs = require("fs");
var chokidar = require("chokidar");
let file = path.resolve("D", "/test/a.log");
var log = console.log.bind(console);
var start = 0;

const readLog = (file, callback) => {
  fs
    .createReadStream(file, {
      flags: "r",
      fd: null,
      start: start
    })
    .on("data", chunk => {
      callback(chunk);
    });
};

readLog(file, chunk => {
  start = chunk.length;
  console.log(chunk.toString());
});

var watcher = chokidar.watch(file, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on("add", path => log(`File ${path} has been added`))
  .on("change", path => {
    log(`File ${path} has been changed`);
    readLog(file, chunk => {
      start = Math.max(chunk.length, start);
      console.log(chunk.toString());
    });
  })
  .on("unlink", path => log(`File ${path} has been removed`));
