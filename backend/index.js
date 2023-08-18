const express = require("express");
const cors = require("cors"); // Cross Origin Resource Sharing help us communicate with the frontend
const mongoose = require("mongoose"); //importing mongo db
const register = require("./routes/register");
const login = require("./routes/login");
const product = require("./product");

const app = express();
require("dotenv").config(); //configuring our dotenv

app.use(express.json()); // configuring a middle ware function
app.use(cors()); // allow us to invoke backend from react

app.use("/api/register", register); //register it to our middleware
app.use("/api/login", login); //register it to our middleware

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/product", (req, res) => {
  res.send(product);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, console.log(`Server running on port ${port}`));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connection is successful..."))
  .catch((err) => console.log("Mongodb connection failed...", err.message));
