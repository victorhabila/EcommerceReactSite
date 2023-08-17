const express = require("express");
const cors = require("cors");
const product = require("./product");

const app = express();

app.use(express.json()); // configuring a middle ware function
app.use(cors()); // allow us to invoke backend from react

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/product", (req, res) => {
  res.send(product);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
