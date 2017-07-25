var shell = require("shelljs");
var iconv = require("iconv-lite");
process.stdout.setEncoding("utf8");
shell.exec(
  "cd D:/ && cd test && mkdir test",
  { encoding: "base64" },
  (code, stdout, stderr) => {
    // console.log(iconv.decode(iconv.encode(stdout, "base64"), "gb2312"));
    // console.log(stdout);

    if(stderr){
        console.log('exec encountered error!')
    }
  }
);
