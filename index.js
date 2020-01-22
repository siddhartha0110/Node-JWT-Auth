const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

app.use(express.json());
dotenv.config();
//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected To MongoDB")
);

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
