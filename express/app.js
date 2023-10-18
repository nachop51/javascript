const express = require("express"); // requrie -> commonjs

const app = express();
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Hello world 🐷" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
