const express = require('express')

const PORT = process.env.PORT ?? 3000

const app = express()
// Disable the x-powered-by header
// This header could result in security issues
app.disable('x-powered-by')

// or path based middleware:
// app.use("/api/*", (req, res, next) => {
// also works with specific methods
// app.get("/", (req, res, next) => {
// app.use((req, res, next) => {
//   console.log("I'm a middleware");
//   next();
// });

// app.use((req, res, next) => {
//   if (req.method !== "POST") return next();
//   if (req.headers["content-type"] !== "application/json") return next();

//   // Here we can process the requests that are only POST
//   // and have the content-type set to application/json

//   let body = "";

//   req.on("data", (chunk) => {
//     body += chunk;
//   });

//   req.on("end", () => {
//     try {
//       req.body = JSON.parse(body);
//       next();
//     } catch (error) {
//       res.status(400).send("Invalid JSON");
//     }
//   });
// });

// ^^^ is the same as:
app.use(express.json())

app.get('/', (req, res) => {
  // res.status(200) // default

  // Content-Type is automatically set to text/html
  // by express when sending a string
  res.send('<h1>Hello world 🐷</h1>')
  // Same if we use json or another thing
  // res.json({ message: "Hello world 🐷" });
})

// app.post("/", (req, res) => {
//   res.status(201).send(req.body);
// });

app.use((req, res) => {
  res.status(404).send('<h1>404 - Page not found</h1>')
})

app.listen(PORT, () =>
  console.log(`server listening on port http://localhost:${PORT}`)
)
