const http = require("http"),
  fs = require("fs"),
  _ = require("lodash"),
  port = 3000,
  server = http.createServer((request, response) => {
    // apply lodash
    console.log(_.random(0, 10));

    const greet = _.once(() => console.log("greet just once"));
    greet();
    greet();
    greet();

    // set header content type
    response.setHeader("Content-Type", "text/html");

    let path = "../views/";

    switch (request.url) {
      case "/":
        path = path.concat("index.html");
        response.statusCode = 200;
        break;
      case "/about-me":
        response.setHeader("Location", "/about");
        response.statusCode = 301;
        response.end();
        break;
      case "/about":
        path = path.concat("about.html");
        response.statusCode = 200;
        break;
      default:
        path = path.concat("404.html");
        response.statusCode = 404;
        break;
    }

    // send an html file (recommended)
    fs.readFile(path, (error, data) => {
      if (error) {
        console.log(error);

        response.end();
      } else {
        // response.write(data);

        // if response.write() receives just 1 arg, that arg can be passed to response.end()
        response.end(data);
      }
    });
  });

server.listen(port, "localhost", () => console.log(`Listening for requests on port ${port}`));
