require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const PORT = 3000;
const URI = process.env.DB_URI;
// Create the server
const app = express();

// Set up home route
app.get("/", function (req, res) {
  res.send("Express here!");
});

app.listen(PORT, function () {
  console.info(`>> Express server is running on port ${PORT}`);
});

// Create the database client
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to database
client
  .connect()
  .then(() => console.log(">> Connected correctly to the database"))
  .catch((err) => {
    console.log(err.stack);
  });
