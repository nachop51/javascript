const http = require("node:http");
const fs = require("node:fs/promises");

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log("request received");

  const { url, method } = req;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (method === "POST") {
    let body = "";

    // Node is an event-driven language, so we can listen for events

    // Data is sent in chunks
    req.on("data", (chunk) => {
      body += chunk;
    });

    // Data is done being sent, so we can do something with it
    req.on("end", () => {
      const data = JSON.parse(body);
      // const params = new URLSearchParams(url);
      // console.log(params.get("name"));
      // res.end(`Thanks ${params.get("name")}!`);

      res.writeHead(201, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(JSON.stringify(data));
    });
  } else {
    if (url === "/") {
      // res.statusCode = 200; // By default, the status code is 200
      res.end("<h1>Hello world 🐷</h1>");
    } else if (url === "/image.png") {
      fs.readFile("./image.png")
        .then((image) => {
          res.setHeader("Content-Type", "image/png");
          res.end(image);
        })
        .catch((err) => {
          console.error(err);
          res.statusCode = 500;
          res.end("<h1>Internal Server Error</h1>");
        });
    } else if (url === "/contact") {
      res.end("<h1>Contact page 🐝</h1>");
    } else {
      res.statusCode = 404;
      res.end("<h1>Page not found 🐷🐝</h1>");
    }
  }
});

server.listen(port, () =>
  console.log(
    `server listening on port http://localhost:${server.address().port}`
  )
);

// Status codes:
// 1xx: Informational
// 2xx: Success
// 3xx: Redirection
// 4xx: Client Error
// 5xx: Server Error
