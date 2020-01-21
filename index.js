const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();
//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected To MongoDB")
);

const authRoute = require("./routes/auth");

app.use("/api/user", authRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
