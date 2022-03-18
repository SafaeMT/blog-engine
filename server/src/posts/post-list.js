module.exports = function makePostList({ db }) {
  return {
    getRecentPosts,
    getPostByID,
    createPost,
    deletePostByID,
  };

  async function getRecentPosts(limit) {
    const query = {};
    const options = {
      sort: { date: -1 },
      limit: Number(limit),
    };
    const cursor = db.collection("posts").find(query, options);
    if ((await cursor.count()) === 0) {
      console.log("No documents found");
    }

    return cursor.toArray();
  }

  function getPostByID(id) {
    const query = { _id: db.makeId(id) };
    return db.collection("posts").findOne(query);
  }

  function createPost(newPost) {
    const query = {
      date: new Date().toISOString(),
      title: newPost.title,
      content: newPost.content,
      authorId: db.makeId(),
      authorName: newPost.authorName,
    };

    return db.collection("posts").insertOne(query);
  }

  async function deletePostByID(id) {
    const query = { _id: db.makeId(id) };
    let result = await db.collection("posts").deleteOne(query);
    return result.deletedCount === 1;
  }
};
