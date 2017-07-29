const fs = require("fs");

const convertPromise = fn => {
  return new Promise((resolve, reject) => {
    fn.resolve = resolve;
    fn.reject = reject;
    fn.call(fn);
  });
};

const readFileFn = filename => {
  return function() {
    fs.readFile(filename, (err, data) => {
      if (err) this.reject(err);
      this.resolve(data);
    });
  };
};

Promise.all([
  convertPromise(readFileFn("../../README.md")),
  convertPromise(readFileFn("../../README.md"))
]).then(result => {
  console.log();
});
