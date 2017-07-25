const fs = require("fs");
const path = require("path");
let file = path.resolve("D", "/test/a2.log");
let file2 = path.resolve("D", "/test/a5.log");

let readStream = fs.createReadStream(file, {
  flags: "r",
  defaultEncoding: "utf8",
  autoClose: true,
  start: 0
});

let count = 0;

readStream.on("data", chunk => {
  let flag = writeStream.write(chunk, function() {
    console.log(count++);
  });

  if (!flag) {
    readStream.pause();
  }
});

let writeStream = fs.createWriteStream(file2, {
  flags: "w",
  defaultEncoding: "utf8",
  autoClose: true,
  start: 0
});

writeStream.on("drain", () => {
  readStream.resume();
});
