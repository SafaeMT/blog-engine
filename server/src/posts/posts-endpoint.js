module.exports = function makePostHandlers({ postList }) {
  return {
    handleGetPosts,
    handleGetPostByID,
  };

  // Request URL must include the 'limit' query parameter (key & value)
  // 'limit' value indicates the number of posts we want to get from database
  async function handleGetPosts(req, res) {
    let { limit } = req.query;
    if (!limit || Number.isNaN(Number(limit)) || Number(limit) <= 0) {
      res.status(400).end();
      return;
    }

    let requestedPosts = await postList.getRecentPosts(limit);
    res.status(200).send(requestedPosts);
  }

  async function handleGetPostByID(req, res) {
    let requestedPost = await postList.getPostByID(req.params.id);
    res.status(200).send(requestedPost);
  }
};