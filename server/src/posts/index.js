const express = require("express");
const router = express.Router();

const makeDb = require("../database");
const makePostHandlers = require("./posts-endpoint");
const makePostList = require("./post-list");

// Define the root route
router.get("/", function (req, res) {
  res.send({ message: "Express backend is here!" });
});

makeDb().then((db) => {
  // Responsible for interacting with the database
  const postList = makePostList({ db });
  // Responsible for interpreting requests and sending responses
  const postHandlers = makePostHandlers({ postList });

  router.get("/posts", postHandlers.handleGetPosts);
  router.get("/posts/:id", postHandlers.handleGetPostByID);
  router.post("/posts", postHandlers.handleCreatePost);
});

module.exports = router;
