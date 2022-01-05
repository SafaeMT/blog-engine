const express = require("express");
const posts = require("../data/posts");
const router = express.Router();

// Define the root route
router.get("/", function (req, res) {
  res.send({ message: "Express backend is here!" });
});

// Request URL must include the 'limit' query parameter (key & value)
// 'limit' value indicates the number of posts we want to get from database
router.get("/posts", function (req, res) {
  let { limit } = req.query;

  if (!limit || Number.isNaN(limit) || Number(limit) <= 0) {
    res.status(400).end();
  }

  posts.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
  res.send(posts);
});

router.get("/posts/:id", function (req, res) {
  let requestedPost = posts.find((post) => {
    return post.id === req.params.id;
  });

  if (!requestedPost) {
    res.status(404).end();
  }
  res.send(requestedPost);
});

module.exports = router;
