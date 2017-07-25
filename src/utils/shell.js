var shell = require("shelljs");
var iconv = require("iconv-lite");
process.stdout.setEncoding("utf8");

export default function exceShell(cmd, cb) {
  shell.exec(cmd, (code, stdout, stderr) => {
    cb(code, stdout, stderr);
  });
}
