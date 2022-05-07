module.exports = function makePostHandlers({ postList }) {
  return {
    handleGetPosts,
    handleGetPostByID,
    handleCreatePost,
    handleDeletePostByID,
    handleUpdatePostByID,
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
    const fields = ["title", "content"];
    const regex = {
      title: /^[A-Za-z0-9 _\-\.,'"?!/]{1,200}$/,
      content: /^[A-Za-z0-9 _\-\.,;:'"`?!/()&#@$*%<>]{1,12000}$/,
    };
    let isValid = true;

    fields.forEach(async (field) => {
      // ESLint "no-prototype-builtins" rule disallows calling
      // some Object.prototype methods directly on object instances.
      // In our case, we must avoid calling "hasOwnProperty" method
      // like this : req.body.hasOwnProperty(field)
      if (
        !Object.prototype.hasOwnProperty.call(req.body, field) ||
        typeof req.body[field] !== "string" ||
        req.body[field].trim() === "" ||
        !regex[field].test(req.body[field])
      ) {
        isValid = false;
      }
    });

    if (!isValid) {
      res.status(422).send({
        success: false,
        error: "The post could not be created (transmitted data is invalid).",
      });
      return;
    }

    const { title, content } = req.body;
    let result = await postList.createPost({
      title: title.trim(),
      content: content.trim(),
    });
    res
      .status(200)
      .send({ success: result.acknowledged, postId: result.insertedId });
  }

  async function handleDeletePostByID(req, res) {
    const isDeleted = await postList.deletePostByID(req.params.id);
    res.send({ success: isDeleted });
  }

  async function handleUpdatePostByID(req, res) {
    // Step 1: Validate request data
    const { title, content } = req.body;
    if (
      (title == undefined && content == undefined) ||
      (title != undefined && !isValidTitle(title)) ||
      (content != undefined && !isValidContent(content))
    ) {
      return res.send({
        success: false,
        error: "The title or the content of the post is not valid",
      });
    }

    function isValidTitle(title) {
      const regex = /^[A-Za-z0-9 _\-\.,?!/]{1,200}$/;
      return (
        typeof title === "string" && title.trim() !== "" && regex.test(title)
      );
    }

    function isValidContent(content) {
      const regex = /^[A-Za-z0-9 _\-\.,;:?!/()&#@$*%<>]{1,12000}$/;
      return (
        typeof content === "string" &&
        content.trim() !== "" &&
        regex.test(content)
      );
    }

    // Step 2: Check if the post exists
    let postToUpdate = await postList.getPostByID(req.params.id);

    if (!postToUpdate) {
      res
        .status(422)
        .send({ success: false, error: "There is no post with this ID" });
      return;
    }

    // Step 3: Compare request data with DB data
    if (
      (title === postToUpdate.title && content === postToUpdate.content) ||
      (title === postToUpdate.title && content == undefined) ||
      (title == undefined && content === postToUpdate.content)
    ) {
      res
        .status(422)
        .send({ success: false, error: "There is nothing to update" });
      return;
    }

    // Step 4: Update DB
    let id = req.params.id;
    let updates = {};

    if (title != undefined) {
      updates.title = title;
    }
    if (content != undefined) {
      updates.content = content;
    }

    await postList.updatePostByID(id, updates);

    // Step 5: Send the response
    res.status(200).send({ success: true });
  }
};
