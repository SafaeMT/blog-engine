const express = require("express");
const router = express.Router();

// Define the root route
router.get("/", function (req, res) {
  res.send({ message: "Express backend is here!" });
});

// Request URL must include the 'limit' query parameter (key & value)
// 'limit' value indicates the number of posts we want to get from database
router.get("/posts", function (req, res) {
  if (!req.query.limit) {
    res.status(400).end();
  }
  res.send({ message: `GET ${req.query.limit} posts` });
});

router.get("/post/:id", function (req, res) {
  res.send({ message: `GET the post that has ID = ${req.params.id}` });
});

module.exports = router;
