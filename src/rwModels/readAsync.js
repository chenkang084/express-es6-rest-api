const fs = require("fs");
const path = require("path");
let file = path.resolve("D", "/test/a.log");
// let file2 = path.resolve("D", "/test/a2.log");
var chokidar = require("chokidar");
var log = console.log.bind(console);
let start = 0,
  fileLength = 0,
  BUFFER_SIZE = 521,
  _fd;

fs.open(file, "r", (err, fd) => {
  _fd = fd;
  fs.fstat(fd, (err, stats) => {
    fileLength = stats.size;

    console.log(fileLength);

    start = fileLength;

    readFile(_fd, () => {
      // console.log(buf.toString());
    });
  });
});

const readFile = (fd, cb) => {

  fs.read(
    fd,
    new Buffer(BUFFER_SIZE),
    0,
    BUFFER_SIZE,
    start,
    (err, bytesRead, buf) => {
      start += bytesRead;

      cb(bytesRead, buf);
    }
  );
};

var watcher = chokidar.watch(file, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on("change", path => {
  log(`File ${path} has been changed`);
  readFile(_fd, (bytesRead,buf) => {
    console.log(buf.slice(0,bytesRead).toString());
  });
});
