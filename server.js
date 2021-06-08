const express = require("express");
const PORT = 3000;

// Create the server
const app = express();

// Set up home route
app.get("/", function (req, res) {
  res.send("Express here!");
});

app.listen(PORT, function () {
  console.info(`>> Express server is running on port ${PORT}`);
});
