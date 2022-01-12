const express = require("express");
const router = require("./routes/api");
const PORT = 8000;

// Create the server
const app = express();

// Initialize routes
app.use("/api", router);

app.listen(PORT, function () {
  console.info(`>> Express server is running on port ${PORT}`);
});
