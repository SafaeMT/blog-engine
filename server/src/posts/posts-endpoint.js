module.exports = function makePostHandlers({ postList }) {
  return {
    handleGetPosts,
    handleGetPostByID,
    handleCreatePost,
    handleDeletePostByID,
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

  async function handleCreatePost(req, res) {
    const fields = ["title", "content", "authorName"];
    let isValid = true;

    fields.forEach(async (field) => {
      // ESLint "no-prototype-builtins" rule disallows calling
      // some Object.prototype methods directly on object instances.
      // In our case, we must avoid calling "hasOwnProperty" method
      // like this : req.body.hasOwnProperty(field)
      if (
        !Object.prototype.hasOwnProperty.call(req.body, field) ||
        typeof req.body[field] !== "string" ||
        req.body[field].length == 0
      ) {
        isValid = false;
      }
    });

    if (!isValid) {
      res.status(422).end();
      return;
    }

    const { title, content, authorName } = req.body;
    let result = await postList.createPost({ title, content, authorName });
    res.status(200).send(result);
  }

  async function handleDeletePostByID(req, res) {
    const isDeleted = await postList.deletePostByID(req.params.id);
    res.send({ success: isDeleted });
  }
};
