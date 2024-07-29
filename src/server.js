const express = require("express");
const app = express();
const port = 3000;

const Router = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
