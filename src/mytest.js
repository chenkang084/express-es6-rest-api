const http = require("http");

let app = {};

http
  .createServer(function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
  })
  .listen(8080, "127.0.0.1");
