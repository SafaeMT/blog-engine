const express = require("express");
const router = express.Router();

// Define the root route
router.get("/", function (req, res) {
  res.send({ message: "Express backend is here!" });
});

module.exports = router;
