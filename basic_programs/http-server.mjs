import http from "node:http";
import process from "node:process";
import findAvailablePort from "./free-port.js";

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log("request received");
  res.end("Hello world");
});

// server.listen(3000, () => console.log("server listening on port 3000"));

// port 0 means that the OS will choose a random port that is available
findAvailablePort(port).then((port) =>
  server.listen(port, () =>
    console.log(
      `server listening on port http://localhost:${server.address().port}`
    )
  )
);
