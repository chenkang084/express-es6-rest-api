const path = require("path");
const fs = require("fs");
var chokidar = require("chokidar");
let file = path.resolve("D", "/test/a.log");
var log = console.log.bind(console);

let socket;
let start = 0,
  hasReadFile,
  io;

const readLog = (file, callback) => {
  let readStream = fs
    .createReadStream(file, {
      flags: "r",
      start: 0
    })
    .on("data", chunk => {
      callback(chunk);
    });
};

readLog(file, chunk => {
  start = chunk.length;
  hasReadFile = chunk.toString();
});

var watcher = chokidar.watch(file, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on("change", path => {
  log(`File ${path} has been changed`);
  readLog(file, chunk => {
    if (start > 0) start = start + chunk.length;
    let msg = chunk.toString();
    console.log('msg read ok');
    io.emit("message", {
      username: socket.username,
      message: msg
    });
  });
});

exports.ws = function(_io) {
  _io.on("connection", function(_socket) {
    console.log("ws connected!");

    socket = _socket;
    io = _io;

    _socket.on("initData", function(username) {
      _io.emit("initBack", {
        username: socket.username,
        message: hasReadFile
      });
    });
  });
};
