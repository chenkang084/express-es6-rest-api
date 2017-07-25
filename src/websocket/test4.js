const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
var log = console.log.bind(console);
let file = path.resolve("D", "/test/a.log");
let file2 = path.resolve("D", "/test/a3.log");

let bufferSize = 1024 * 16; //16k
let position = 0;

let start = new Date().getTime();
fs.open(file, "r", (err, fd) => {
  fs.fstat(fd, (err, stats) => {
    console.log("fstat", new Date().getTime() - start);

    const loop = () => {
      let buffer = new Buffer(bufferSize);
      fs.read(fd, buffer, 0, bufferSize, position, (err, bytesRead, buf) => {
        console.log("read file spent", new Date().getTime() - start, "s");

        writeFile(buf, position);

        position += bytesRead;

        
        if (bytesRead < bufferSize) {
          console.log("read the end line!");
        } else {
          loop();
        }
      });
    };

    loop();
  });
});

const writeFile = (buf, position) => {
  //   fs.open(file2, "w", (err, fd) => {
  //     fs.write(fd, buf.toString(), position, "utf8", (err, written, str) => {
  //       console.log(written);
  //     });
  //   });
  //   fs.writeFile(file2, buf.toString(), { encoding: "utf8" }, err => {
  //     console.log("write ok");
  //   });
  let write = fs.createWriteStream(file2, {
    flags: "r+",
    defaultEncoding: "utf8",
    // fd: null,
    // mode: 0o666,
    autoClose: true,
    start: position
  });

  write.write(buf);
  write.end();
};
