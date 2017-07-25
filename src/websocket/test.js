const fs = require("fs");
var chokidar = require("chokidar");
const path = require("path");
let file = path.resolve("D", "/test/a.log");
var log = console.log.bind(console);
var start = 0;
let readStream;
const readLog = (file, callback) => {
  readStream = fs.createReadStream(file, {
    flags: "r",
    start: start
  });

  readStream
    .on("data", chunk => {
      callback(chunk);
      readStream += chunk.toString();
      // readStream.destroy();
    })
    .on("end", function() {
      // This may not been called since we are destroying the stream
      // the first time 'data' event is received
      console.log("All the data in the file has been read");
    })
    .on("close", function(err) {
      console.log("Stream has been destroyed and file has been closed");

      start = readStream.length;
      console.log(`start=${start}`);
    });
};

readLog(file, chunk => {
  start = chunk.length;
  console.log(start);
});

var watcher = chokidar.watch(file, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on("change", path => {
  log(`File ${path} has been changed`);
  // readLog(file, chunk => {
  //   if (start > 0) start = start + chunk.length;
  //   let msg = chunk.toString();
  //   console.log('msg read ok');

  // });
  console.log(`length=${start}`);
  fs
    .createReadStream(file, {
      flags: "r",
      start: start
    })
    .on("data", chunk => {
      let msg = chunk.toString();
      console.log("msg read ok", msg);
    });
});

fs
  .createReadStream(file, {
    flags: "r",
    start: 12277044
  })
  .on("data", chunk => {
    let msg = chunk.toString();
    console.log("msg read ok", msg);
  });
