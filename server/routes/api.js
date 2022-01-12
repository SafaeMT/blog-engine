const express = require("express");
const { ObjectId } = require("mongodb");
const makeDb = require("../database/db");
const router = express.Router();

// Define the root route
router.get("/", function (req, res) {
  res.send({ message: "Express backend is here!" });
});

makeDb().then((db) => {
  // Request URL must include the 'limit' query parameter (key & value)
  // 'limit' value indicates the number of posts we want to get from database
  router.get("/posts", async function (req, res) {
    let { limit } = req.query;
    if (!limit || Number.isNaN(limit) || Number(limit) <= 0) {
      res.status(400).end();
    }

    const query = {};
    const options = {
      sort: { date: -1 },
      limit: Number(limit),
    };
    const cursor = db.collection("posts").find(query, options);
    if ((await cursor.count()) === 0) {
      console.log("No documents found");
    }
    let requestedPosts = await cursor.toArray();
    res.send(requestedPosts);
  });

  router.get("/posts/:id", async function (req, res) {
    const query = { _id: ObjectId(req.params.id) };
    let requestedPost = await db.collection("posts").findOne(query);
    res.send(requestedPost);
  });
});

module.exports = router;
